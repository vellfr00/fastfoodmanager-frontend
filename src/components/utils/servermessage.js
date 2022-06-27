import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Servermessage extends React.Component {
    render() {
        if(this.props.message !== "") {
            let title = (this.props.success) ? "Successo" : "Errore";
            let icon = (this.props.success) ? faCheck : faExclamationTriangle;

            return (
                <div className={"success-" + this.props.success}>
                    <h3><FontAwesomeIcon icon={icon} /> {title}</h3>
                    <p>{this.props.message}</p>
                </div>
            );
        }
    }
}

export default Servermessage;