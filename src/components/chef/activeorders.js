import React from "react";
import Activeorderitem from "./activeorderitem";
import Servermessage from "../utils/servermessage";

class Activeorders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            success: false,
            message: "",
            orders: [],
            listeningID: ""
        };

        this.handleOrder = this.handleOrder.bind(this);
    }

    handleOrder(index) {
        const request = new Request('http://localhost:8080/api/orders/update/' + this.state.orders[index].orderid, {
            method: "post",

            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }),

            body: JSON.stringify({status: "Preso in Carico"})
        });

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.props.cb(data.data);
            } else {
                this.setState({success: false, message: data.data.message});
            }
        }).catch(error => {
            this.setState({success: false, message: error.message});
        });
    }

    componentDidMount() {
        const request = new Request('http://localhost:8080/api/orders/active', {
            method: 'get',

            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem('token')
            })
        });

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({isFetching: false, orders: data.data});

                //Dobbiamo passare il token nell'URL perchè non possiamo impostare l'header Authorization
                const updateSource = new EventSource('http://localhost:8080/api/orders/new?token=' + localStorage.getItem('token'));

                updateSource.addEventListener("id", e => {
                    this.setState({listeningID: JSON.parse(e.data).id});
                });

                updateSource.addEventListener("order", e => {
                    let order = JSON.parse(e.data);

                    let bufferOrder = this.state.orders;
                    bufferOrder.push(order);

                    this.setState({orders: bufferOrder});
                });

            } else {
                this.setState({isFetching: false, success: false, message: data.data.message});
            }
        }).catch(error => {
            this.setState({isFetching: false, success: false, message: error.message});
        });
    }

    componentWillUnmount() {
        if(this.state.listeningID !== -1) {
            fetch('http://localhost:8080/api/orders/new-unsubscribe/' + this.state.listeningID, {
                method: "post"
            });
            //NON SERVE FARE NULLA CON LA RISPOSTA :)
        }
    }

    render() {
        let items = this.state.orders.map((order, index) => {
            return  <Activeorderitem index={index} order={order} cb={this.handleOrder}/>;
        });

        if(this.state.isFetching) {
            return (
                <div>
                    <h3>Gestione Ordinazioni</h3>
                    <p>In attesa di risposta dal server...</p>
                </div>
            );
        }

        return (
            <div className="chefpanel">
                <h3>Gestione Ordinazioni</h3>
                <Servermessage success={this.state.success} message={this.state.message} />
                {(items.length > 0) ? (<ul id="activeorders">{items}</ul>) : (<p>Nessun ordine in attesa di preparazione</p>)}
            </div>
        );
    }
}

export default Activeorders;