import React from 'react'
import Orderhandle from "./orderhandle";
import Activeorders from "./activeorders";
import Servermessage from "../utils/servermessage";

class Chefpanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            message: "",
            isFetching: true,
            assigned: null
        }

        this.handleOrderReady = this.handleOrderReady.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
    }

    handleOrderReady() {
        this.setState({assigned: null});
    }

    handleOrder(order) {
        this.setState({assigned: order});
    }

    componentDidMount() {
        const request = new Request('http://localhost:8080/api/orders/assigned', {
            method: 'get',

            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem('token')
            })
        });

        fetch(request).then(res => {
            if (res.status === 404) {
                this.setState({isFetching: false});
            } else {
                res.json().then(order => {
                    this.setState({isFetching: false, assigned: order.data});
                });
            }
        }).catch(error => {
            this.setState({isFetching: false, success: false, message: error.message});
        })
    }

    render() {
        if(this.state.isFetching) {
            return(
                <div>
                    <h3>Gestione Ordinazioni</h3>
                    <p>In attesa di risposta dal server...</p>
                </div>
            );
        }

        if(this.state.message !== "") {
            return (
                <div>
                    <h3>Gestione Ordinazioni</h3>
                    <Servermessage success={this.state.success} message={this.state.message} />
                </div>
            );
        }

        if(this.state.assigned === null) {
            return(
                <Activeorders cb={this.handleOrder} />
            );
        }

        return(
            <Orderhandle order={this.state.assigned} cb={this.handleOrderReady} />
        );
    }
}

export default Chefpanel;