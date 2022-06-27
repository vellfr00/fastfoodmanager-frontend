import React from "react";
import Orderitem from "./orderitem";
import Servermessage from "../utils/servermessage";

class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            message: "",
            firstname: "",
            lastname: "",
            table: "",
            foodids: [],
            foodquantities: [],
            orderitems: [],
            foodtotals: [],
            buttonMessage: "Paga e ordina",
            buttonDisabled: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const request = new Request('http://localhost:8080/api/orders', {
            method: "post",

            headers: new Headers({
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                table: this.state.table,
                name: this.state.foodids,
                quantity: this.state.foodquantities
            })
        });

        this.setState({buttonDisabled: true, buttonMessage: "Invio ordine in corso..."});

        fetch(request).then(res => res.json()).then(data => {
            this.setState({buttonDisabled: false, buttonMessage: "Paga e ordina", success: data.success});

            if(data.success) {
                this.setState({message: "Ordine inviato correttamente. Puoi monitorare lo stato di preparazione dalla sezione Cerca ordine inserendo il numero ordine #" + data.data.orderid});
            } else {
                this.setState({message: "Errore nell'invio dell'ordine: " + data.data.message});
            }
        }).catch(error => {
            this.setState({
                buttonDisabled: false,
                buttonMessage: "Paga e ordina",
                success: false,
                message: "Errore nell'invio dell'ordine: " + error.message
            });
        });
    }

    handleAdd() {
        console.log(this.state.orderitems.length + 1);

        this.setState({orderitems: this.state.orderitems.concat(
            <li key={this.state.orderitems.length + 1}>
                <Orderitem data={this.props.data} cb={(foodid, quantity, total) => this.handleCallback(this.state.orderitems.length, foodid, quantity, total)} />
            </li>)});
    }

    handleRemove() {
        if(this.state.orderitems.length > 0) {
            this.setState({
                orderitems: this.state.orderitems.slice(0, this.state.orderitems.length - 1),
                foodids: this.state.foodids.slice(0, this.state.foodids.length - 1),
                foodquantities: this.state.foodquantities.slice(0, this.state.foodquantities.length - 1),
                foodtotals: this.state.foodtotals.slice(0, this.state.foodtotals.length - 1)
            });
        }
    }

    handleCallback(index, foodid, quantity, total) {
        let oldIds = this.state.foodids;
        oldIds[index] = foodid;

        let oldQ = this.state.foodquantities;
        oldQ[index] = quantity;

        let oldTotal = this.state.foodtotals;
        oldTotal[index] = total;

        this.setState({foodids: oldIds, foodquantities: oldQ, foodtotals: oldTotal});
    }

    render() {
        return (
            <>
                <Servermessage success={this.state.success} message={this.state.message} />

                <form id="orderform" onSubmit={this.handleSubmit}>
                    <input type="text" name="firstname" placeholder="Nome" value={this.state.firstname} onChange={this.handleChange}></input>
                    <input type="text" name="lastname" placeholder="Cognome" value={this.state.lastname} onChange={this.handleChange}></input>
                    <input type="number" name="table" placeholder="Tavolo" value={this.state.table} onChange={this.handleChange}></input>

                    <fieldset>
                        <legend>Ordinazione</legend>
                        <ul>
                            <li key={0}><Orderitem data={this.props.data} cb={(foodid, quantity, total) => this.handleCallback(0, foodid, quantity, total)}/></li>
                            {this.state.orderitems}
                        </ul>
                    </fieldset>

                    <p>TOTALE: {this.state.foodtotals.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)} €</p>

                    <div>
                        <input type={"button"} value={"Aggiungi pietanza"} onClick={this.handleAdd}/>
                        <input type={"button"} value={"Rimuovi pietanza"} onClick={this.handleRemove}/>
                        <input type={"submit"} value={this.state.buttonMessage} disabled={this.state.buttonDisabled} onClick={this.handleSubmit}></input>
                    </div>
                </form>
            </>

        );
    }
}

export default Order;