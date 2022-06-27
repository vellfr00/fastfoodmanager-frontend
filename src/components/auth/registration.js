import React from "react";
import Servermessage from "../utils/servermessage";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            message: "",
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            role: "admin",
            buttonMessage: "Registra",
            buttonDisabled: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({buttonMessage: "Registrazione in corso...", buttonDisabled: true});

        const request = new Request('http://localhost:8080/api/users/register', {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                password: this.state.password,
                role: this.state.role
            })
        });

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({success: data.success, message: "Utente registrato correttamente. Puoi ora tornare nell'Area Personale Autorizzato ed autenticarti.", buttonMessage: "Registra", buttonDisabled: false});
            } else {
                this.setState({success: data.success, message: "Errore nella registrazione: " + data.data.message, buttonMessage: "Registra", buttonDisabled: false});
            }
        }).catch(error => {
            this.setState({success: false, message: "Errore nella registrazione: " + error.message, buttonMessage: "Registra", buttonDisabled: false});
        });
    }

    render() {
        return (
            <>
                <Servermessage success={this.state.success} message={this.state.message}/>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username"></input>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} placeholder="Nome"></input>
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} placeholder="Cognome"></input>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"></input>

                    <fieldset>
                        <legend>Ruolo</legend>
                        <label htmlFor="admin">Amministratore</label>
                        <input type="radio" id="admin" name="role" value="admin" onChange={this.handleChange} checked={this.state.role === "admin"}></input>
                        <label htmlFor="chef">Cuoco</label>
                        <input type="radio" id="chef" name="role" value="chef" onChange={this.handleChange} checked={this.state.role === "chef"}></input>
                    </fieldset>
                    
                    <input type="submit" value={this.state.buttonMessage} disabled={this.state.disabled}></input>
                </form>
            </>
        );
    }
}

export default Registration;