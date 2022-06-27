import React from "react";
import Ordersummaryitem from "./ordersummaryitem";
import Servermessage from "../utils/servermessage";

class Orderstatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            success: false,
            serverMessage: "",
            id: this.props.orderid,
            statustitle: "",
            statuscode: 1,
            message: "",
            chef: "",
            listeningID: -1,
            order: {}
        };
    }

    componentDidMount() {
        const request = new Request('http://localhost:8080/api/orders/' + this.state.id);

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({isFetching: false, order: data.data});
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

    render() {
        if(this.state.isFetching) {
            if(this.state.serverMessage === "") {
                return (
                    <main>
                        <h2>Ordinazione in carico</h2>
                        <p>In attesa di risposta dal server...</p>
                    </main>
                );
            } else {
                return (
                    <main>
                        <h2>Ordinazione in carico</h2>
                        <Servermessage success={this.state.success} message={this.state.serverMessage} />
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

        return(
            <div id="chefhandle">
                <h3>Ordinazione in carico</h3>
                <div className="orderinfo">
                    <h4>Ordine numero #{this.state.order.orderid}</h4>
                    <p>Tavolo numero #{this.state.order.table}</p>
                    <p>Effettuato in data {new Date(this.state.order.date).toLocaleString('it-IT')} da {this.state.order.firstname} {this.state.order.lastname}</p>
                </div>
                <div>
                    <h4>Riepilogo dell'ordine</h4>
                    <ul id="ordersummary">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Orderstatus;