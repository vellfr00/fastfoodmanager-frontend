import React from "react";
import Orderstatus from "../order/orderstatus";

class Orderhandle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            message: ""
        }

        this.handleReady = this.handleReady.bind(this);
    }

    handleReady() {
        const request = new Request('http://localhost:8080/api/orders/update/' + this.props.order.orderid, {
            method: "post",

            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }),

            body: JSON.stringify({status: "Pronto"})
        });

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.props.cb();
            } else {
                this.setState({success: false, message: data.data.message});
            }
        }).catch(error => {
            this.setState({success: false, message: error.message});
        });
    }

    render() {
        return (
            <>
                <Orderstatus orderid={this.props.order.orderid} chef={true}/>
                <button onClick={this.handleReady}>Segnala ordine come Pronto</button>
            </>
        );
    }
}

export default Orderhandle;