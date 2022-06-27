import React from "react";
import Ordersummaryitem from "../components/order/ordersummaryitem";
import Servermessage from "../components/utils/servermessage";
import {Link} from "react-router-dom";

class Orderstatuspage extends React.Component {
    constructor(props) {
        super(props);

        const { orderid } = this.props.match.params;

        this.state = {
            isFetching: true,
            success: false,
            serverMessage: "",
            id: orderid,
            statustitle: "",
            statuscode: 1,
            message: "",
            chef: "",
            listeningID: -1,
            order: {}
        };
    }

    switchStatus(state, firstname, lastname) {
        let status = 0, message = "", chefmsg = "";

        switch (state) {
            case "Ricevuto":
                status = 1;
                message = "L'ordine è stato ricevuto dagli chef";
                break;
            case "Preso in Carico":
                status = 2;
                message = "L'ordine è stato preso in carico ed è in preparazione";
                chefmsg = "Ordine preso in carico da: " + firstname + " " + lastname;
                break;
            default:
                status = 3;
                message = "L'ordine è stato preparato ed è pronto per essere ritirato";
                chefmsg = "Ordine preparato da: " + firstname + " " + lastname;
                break;
        }

        this.setState({statustitle: state, statuscode: status, message: message, chef: chefmsg});
    }

    componentDidMount() {
        const request = new Request('http://localhost:8080/api/orders/' + this.state.id);

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.switchStatus(data.data.status, data.data.chef_firstname, data.data.chef_lastname);
                this.setState({isFetching: false, order: data.data});

                const updateSource = new EventSource('http://localhost:8080/api/orders/update/' + data.data.orderid);
                updateSource.addEventListener("id", e => {
                    this.setState({listeningID: JSON.parse(e.data).id});
                });

                updateSource.addEventListener("status", e => {
                    let order = JSON.parse(e.data);
                    this.switchStatus(order.status, order.firstname, order.lastname);
                });

            } else {
                this.setState({
                    success: false,
                    serverMessage: "Errore nell'ottenimento dell'ordine: " + data.data.message
                });
            }

        }).catch(error => {
            this.setState({
                success: false,
                serverMessage: "Errore nell'ottenimento dell'ordine: " + error.message
            });
        });
    }

    componentWillUnmount() {
        if(this.state.listeningID !== -1) {
            fetch('http://localhost:8080/api/orders/update-unsubscribe/' + this.state.listeningID, {
                method: "post"
            });
            //NON SERVE FARE NULLA CON LA RISPOSTA :)
        }
    }

    render() {
        if(this.state.isFetching) {
            if(this.state.serverMessage === "") {
                return (
                    <main>
                        <h2>Stato dell'ordine</h2>
                        <p>In attesa di risposta dal server...</p>
                    </main>
                );
            } else {
                return (
                    <main>
                        <h2>Stato dell'ordine</h2>
                        <Servermessage success={this.state.success} message={this.state.serverMessage} />
                        <p>Clicca <Link to={'/order-search'}>qui</Link> per cercare un nuovo ordine</p>
                    </main>
                );
            }

        }

        const items = this.state.order.content.map((e, index) => {
            let foodname;

            try {
                foodname = e.food.name;
            } catch (error) {
                foodname = "Pietanza eliminata";
            }

            return <Ordersummaryitem key={index} name={foodname} quantity={e.quantity} />
        });

        return (
            <main>
                <h2>Stato dell'ordine</h2>
                <div id="statuspanel">
                    <div className={"status" + this.state.statuscode}>
                        <h3>{this.state.statustitle}</h3>
                        <p>{this.state.message}</p>
                        {this.state.chef !== "" && <p>{this.state.chef}</p>}
                    </div>
                    <div class="orderinfo">
                        <h3>Ordine numero #{this.state.order.orderid}</h3>
                        <p>Tavolo numero #{this.state.order.table}</p>
                        <p>Effettuato in data {new Date(this.state.order.date).toLocaleString('it-IT')} da {this.state.order.firstname} {this.state.order.lastname}</p>
                    </div>
                    <div>
                        <h3>Riepilogo dell'ordine</h3>
                        <ul id="ordersummary">
                            {items}
                        </ul>
                    </div>
                </div>
            </main>
        );
    }
}

export default Orderstatuspage;