import React from "react";

class Orderitem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            foodid: "",
            options: <></>,
            price: 0,
            quantity: 1,
            total: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let first = this.props.data[0];

        const options = this.props.data.map((food, index) => {
            return <option key={index} value={food._id}>{food.name}</option>;
        });

        this.setState({options: options, foodid: first._id, price: first.price, total: first.price * this.state.quantity});

        this.props.cb(first._id, 1, first.price * this.state.quantity);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});

        if(event.target.type !== "number") {
            let food = this.props.data.find(e => {
                return e._id === event.target.value;
            });

            this.setState({foodid: food._id, price: food.price, total: food.price * this.state.quantity});
            this.props.cb(food._id, this.state.quantity, food.price * this.state.quantity);
        } else {
            this.setState({total: this.state.price * event.target.value});
            this.props.cb(this.state.foodid, event.target.value, this.state.price * event.target.value);
        }
    }

    render() {
        return (
            <div className="orderitem">
                <select name="foodid" onChange={this.handleChange} value={this.state.foodid}>
                    {this.state.options}
                </select>
                <input type="number" min="1" name="quantity" placeholder="Quantità" value={this.state.quantity} onChange={this.handleChange}></input>
                <p>{this.state.quantity} x {this.state.price.toFixed(2)} € = {this.state.total.toFixed(2)} €</p>
            </div>
        );
    }
}

export default Orderitem;