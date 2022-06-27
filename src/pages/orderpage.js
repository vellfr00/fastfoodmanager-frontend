import React from "react";
import Menu from "../components/order/menu";
import Order from "../components/order/order";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Servermessage from "../components/utils/servermessage";

class Orderpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            success: false,
            message: "",
            menuVisible: false,
            menuTitle: "Consulta Menu",
            menuIcon: faCaretDown,
            menu: []
        }

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount() {
        const request = new Request('http://localhost:8080/api/menu');

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({menu: data.data, isFetching: false});
            } else {
                this.setState({isFetching:false, success: false, message: data.data.message});
            }
        }).catch(error => {
            this.setState({success: false, message: error.message});
        });
    }

    handleMenuClick(event) {
        if(!this.state.menuVisible) {
            this.setState({menuVisible: true, menuTitle: "Menu", menuIcon: faCaretUp});
        } else {
            this.setState({menuVisible: false, menuTitle: "Consulta Menu", menuIcon: faCaretDown});
        }
    }

    render() {
        if(this.state.isFetching)
            return(
                <main>
                    <h2>Nuovo Ordine</h2>
                    <p>In attesa di risposta dal server...</p>
                </main>
            );

        if(this.state.message !== "") {
            return(
                <main>
                    <h2>Nuovo Ordine</h2>
                    <Servermessage success={this.state.success} message={this.state.message} />
                </main>
            );
        }

        if(this.state.menu.length === 0)
            return(
                <main>
                    <h2>Nuovo Ordine</h2>
                    <p>Non è possibile effettuare una nuova ordinazione in quanto il menu è vuoto</p>
                </main>
            );

        return (
            <main>
                <h2>Nuovo Ordine</h2>
                <div id="neworderpage" className={"flexcol-" + !this.state.menuVisible}>
                    <div>
                        <h3 onClick={this.handleMenuClick}>{this.state.menuTitle} <FontAwesomeIcon icon={this.state.menuIcon} /></h3>
                        <div className={"ordermenu-" + this.state.menuVisible} hidden={!this.state.menuVisible}>
                            <Menu data={this.state.menu} admin={false}/>
                        </div>
                    </div>
                    <div>
                        <h3>Ordinazione</h3>
                        <Order data={this.state.menu}/>
                    </div>
                </div>
            </main>
        );
    }
}

export default Orderpage;