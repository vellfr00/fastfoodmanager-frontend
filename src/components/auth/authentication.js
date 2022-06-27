import React from "react";
import {Link} from "react-router-dom";
import Servermessage from "../utils/servermessage";

class Authentication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            success: false,
            message: "",
            buttonMessage: "Login",
            buttonDisabled: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({buttonMessage: "Login in corso...", buttonDisabled: true});

        const request = new Request('http://localhost:8080/api/users/auth', {
            method: "post",

            headers: new Headers({
               "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({success: data.success, message: "Utente autenticato con successo", buttonMessage: "Login", buttonDisabled: false});

                localStorage.setItem("token", data.data.token);
                this.props.cb(data.data);
            } else {
                this.setState({success: data.success, message: "Errore nel login: " + data.data.message, buttonMessage: "Login", buttonDisabled: false});
            }
        }).catch(error => {
            this.setState({success: false, message: "Errore nel login: " + error.message, buttonMessage: "Login", buttonDisabled: false});
        });
    }

    render() {
        return (
            <>
                <Servermessage success={this.state.success} message={this.state.message} />

                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username"></input>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"></input>
                    <input type="submit" value={this.state.buttonMessage} disabled={this.state.buttonDisabled}></input>
                </form>

                <p>Clicca <Link to="/register">qui</Link> per registrare un nuovo utente</p>
            </>
        );
    }
}

export default Authentication;