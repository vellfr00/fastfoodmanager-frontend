import React from "react";

class Activeorderitem extends React.Component {
    render() {
        return (
            <li key={this.props.index}>
                <h4>Ordine #{this.props.order.orderid}</h4>
                <p>Tavolo #{this.props.order.table}</p>
                <p>Effettuato in data {new Date(this.props.order.date).toLocaleString('it-IT')} da {this.props.order.firstname} {this.props.order.lastname}</p>
                <button onClick={() => {this.props.cb(this.props.index)}}>Prendi ordine in carico</button>
            </li>
        );
    }
}

export default Activeorderitem;