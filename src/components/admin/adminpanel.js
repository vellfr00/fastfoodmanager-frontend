import React from "react";
import Transactionspanel from "./transactionspanel";
import Menupanel from "./menupanel";

class Adminpanel extends React.Component {
    render() {
        return(
            <div>
                <Menupanel />
                <Transactionspanel />
            </div>
        );
    }
}

export default Adminpanel;