import React from "react";
import Authentication from "../components/auth/authentication";

import {faUserTie} from "@fortawesome/free-solid-svg-icons";
import {faKitchenSet} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Adminpanel from "../components/admin/adminpanel";
import Chefpanel from "../components/chef/chefpanel";

class Authorizedpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem("token"),
            isAuthenticated: false,
            firstname: "",
            lastname: "",
            role: "",
            icon: faUserTie
        }

        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleAuth(data) {
        if(data.role === "admin") {
            this.setState({icon: faUserTie});
        } else {
            this.setState({icon: faKitchenSet});
        }

        this.setState({token: data.token, firstname: data.firstname, lastname: data.lastname, role: data.role, isAuthenticated: true});
    }

    handleLogout() {
        localStorage.removeItem("token");
        this.setState({token: null, isAuthenticated: false, firstname: "", lastname: "", role: ""});
    }

    componentDidMount() {
        if(!this.state.isAuthenticated) {
            fetch('http://localhost:8080/api/users/', {
                method: 'get',

                headers: new Headers({
                    "Authorization": "Bearer " + this.state.token
                })
            }).then(res => res.json()).then(data => {
                if(data.success) {
                    this.setState({firstname: data.data.firstname, lastname: data.data.lastname, role: data.data.role, isAuthenticated: true});

                    if(data.data.role === "admin") {
                        this.setState({icon: faUserTie});
                    } else {
                        this.setState({icon: faKitchenSet});
                    }
                } else {
                    this.handleLogout();
                }

            }).catch(error => {
                this.handleLogout();
            });
        }
    }

    render() {
        if(this.state.token === null) {
            return (
                <main>
                    <h2>Area Personale Autorizzato</h2>
                    <Authentication cb={(data) => this.handleAuth(data)} />
                </main>
            );
        }

        if(!this.state.isAuthenticated) {
            return (
                <main>
                    <h2>Area Personale Autorizzato</h2>
                    <p>In attesa di risposta dal server...</p>
                </main>
            );
        }

        if(this.state.role === "admin") {
            return (
                <main>
                    <h2>Area Personale Autorizzato</h2>
                    <div id="userinfo">
                        <h3>{this.state.firstname} {this.state.lastname}</h3>
                        <h3><FontAwesomeIcon icon={this.state.icon} /> {this.state.role}</h3>
                        <button onClick={this.handleLogout} id="logout">Logout</button>
                    </div>
                    <Adminpanel />
                </main>
            );
        }

        return (
            <main>
                <h2>Area Personale Autorizzato</h2>
                <div id="userinfo">
                    <h3>{this.state.firstname} {this.state.lastname}</h3>
                    <h3><FontAwesomeIcon icon={this.state.icon} /> {this.state.role}</h3>
                    <button onClick={this.handleLogout} id="logout">Logout</button>
                </div>
                <Chefpanel />
            </main>
        );
    }
}

export default Authorizedpage;