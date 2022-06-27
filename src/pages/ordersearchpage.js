import React from "react";
import Ordersearch from "../components/order/ordersearch";

class Ordersearchpage extends React.Component {
    render() {
        return (
            <main>
                <h2>Cerca ordine</h2>
                <Ordersearch />
            </main>
        );
    }
}

export default Ordersearchpage;