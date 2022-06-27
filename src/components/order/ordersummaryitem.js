import React from "react";

class Ordersummaryitem extends React.Component {
    render() {
        return (
            <li key={this.props.key}>{this.props.quantity} x {this.props.name}</li>
        );
    }
}

export default Ordersummaryitem;