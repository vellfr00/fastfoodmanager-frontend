import React from "react";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Menu extends React.Component {
    render() {
        const list = this.props.data.map((food, index) => {
            if(this.props.admin) {
                return (
                    <li key={index} className="menuitem no-padding">
                        <div id="menudata">
                            <p>{food.name}</p>
                            <p>{food.price.toFixed(2)} €</p>
                        </div>
                        <button className="menubutton" onClick={() => {this.props.cbDelete(index)}}><FontAwesomeIcon icon={faTrash} /> Elimina</button>
                    </li>
                );
            }

            return (
                <li key={index} className="menuitem clientmenu">
                    <p>{food.name}</p>
                    <p>{food.price.toFixed(2)} €</p>
                </li>
            );
        });

        return (
            <ul id="menu">
                {list}
            </ul>
        );
    }
}

export default Menu;