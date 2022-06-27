import React from "react";
import Servermessage from "../utils/servermessage";

class Transactionspanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            message: "",
            isFetching: true,
            transactions: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/transactions', {
           method: 'get',

           headers: new Headers({
               "Authorization": "Bearer " + localStorage.getItem("token")
           })
        }).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({isFetching: false, transactions: data.data.map((transaction, index) =>
                        <li key={index}>
                            <div>
                                <span>Ordine #{transaction.order.orderid}</span>
                                <span>ID transazione: {transaction._id}</span>
                            </div>

                            <span className='transactiontotal'>{transaction.total.toFixed(2)} €</span>
                        </li>
                    )});
            } else {
                this.setState({isFetching: false, success: false, message: data.data.message});
            }
        }).catch(error => {
            this.setState({isFetching: false, success: false, message: error.message});
        });
    }

    render() {
        if(this.state.isFetching) {
            return(
                <div id="transactions">
                    <h3>Storico Transazioni</h3>
                    <p>In attesa di risposta dal server...</p>
                </div>
            );
        }

        if(this.state.message !== "") {
            return(
                <div id="transactions">
                    <h3>Storico Transazioni</h3>
                    <Servermessage success={this.state.success} message={this.state.message} />
                </div>
            );
        }

        return(
            <div id="transactions">
                <h3>Storico Transazioni</h3>
                <ul>
                    {this.state.transactions}
                </ul>
            </div>
        );
    }
}

export default Transactionspanel;