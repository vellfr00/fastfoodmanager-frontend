import React from 'react'

class Addfood extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/api/menu/add', {
            method: 'post',

            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                name: this.state.name,
                price: this.state.price
            })
        }).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({name: "", price: ""});
                this.props.cb(data.data);
                this.props.cbMessage(data.success, "Pietanza aggiunta con successo al menu");
            } else {
                this.props.cbMessage(data.success, data.data.message);
            }
        }).catch(error => {
            this.props.cbMessage(false, "Errore nell'aggiunta nuova pietanza: " + error.message);
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div>
                <h4>Aggiungi pietanza </h4>
                <form onSubmit={this.handleSubmit} className="form-no-margin">
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}
                           placeholder="Nome pietanza"/>
                    <input type="number" name="price" step=".01" value={this.state.price} onChange={this.handleChange}
                           placeholder="Prezzo pietanza"/>
                    <input type="submit" value="Aggiungi"/>
                </form>
            </div>
        );
    }
}

export default Addfood;