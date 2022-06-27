import React from "react";
import {Link} from "react-router-dom";

class Ordersearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="number" name="order" placeholder={"Numero ordine"} min={0} value={this.state.order} onChange={this.handleChange} required={true}></input>
                <Link to={"/order/" + this.state.order}>
                    <input type="submit" value="Cerca"/>
                </Link>
            </form>
        );
    }
}

export default Ordersearch;