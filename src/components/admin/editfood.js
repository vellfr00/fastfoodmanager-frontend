import React from 'react'

class Editfood extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            newname: "",
            newprice: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/api/menu/update', {
            method: 'post',

            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                name: this.state.name,
                newname: this.state.newname,
                newprice: this.state.newprice
            })
        }).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({name: "", newname:"", newprice: ""});
                this.props.cb(data.data);
                this.props.cbMessage(data.success, "Pietanza modificata con successo");
            } else {
                this.props.cbMessage(data.success, data.data.message);
            }
        }).catch(error => {
            this.props.cbMessage(false, error.message);
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div>
                <h4>Modifica pietanza</h4>
                <form onSubmit={this.handleSubmit} className="form-no-margin">
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}
                           placeholder="Nome pietanza da modificare"/>
                    <input type="text" name="newname" value={this.state.newname} onChange={this.handleChange}
                           placeholder="Nuovo nome pietanza"/>
                    <input type="number" name="newprice" step=".01" value={this.state.newprice} onChange={this.handleChange}
                           placeholder="Nuovo prezzo pietanza"/>
                    <input type="submit" value="Modifica"/>
                </form>
            </div>
        );
    }
}

export default Editfood;