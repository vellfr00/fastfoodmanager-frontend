import React from "react";
import Menu from "../order/menu";
import Addfood from "./addfood";
import Servermessage from "../utils/servermessage";
import Editfood from "./editfood";

class Menupanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: true,
            message: "",
            isFetching: true,
            menu: []
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleMessage(success, message) {
        this.setState({success: success, message: message});
    }

    handleUpdate(data) {
        let menuBuffer = this.state.menu;
        let index = menuBuffer.findIndex(food => {
            return food.name == data.oldDocument;
        });


        let buffer = menuBuffer[index];

        buffer.name = data.newDocument.name;
        buffer.price = data.newDocument.price;

        menuBuffer[index] = buffer;

        this.setState({menu: menuBuffer});
    }

    handleAdd(newfood) {
        let bufferMenu = this.state.menu;
        bufferMenu.push(newfood);

        this.setState({menu: bufferMenu});
    }

    handleDelete(index) {
        let food = this.state.menu[index].name;

        fetch('http://localhost:8080/api/menu/delete', {
            method: 'post',

            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                name: food
            })
        }).then(res => res.json()).then(data => {
            if(data.success) {
                let bufferMenu = this.state.menu;
                bufferMenu.splice(index, 1);

                this.setState({menu: bufferMenu});
                this.handleMessage(true, "Pietanza rimossa con successo");
            } else {
                this.handleMessage(false, data.data.message);
            }
        }).catch(error => {
            this.handleMessage(false, error.message);
        });
    }

    componentDidMount() {
        const request = new Request('http://localhost:8080/api/menu');

        fetch(request).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState({menu: data.data, isFetching: false});
            } else {
                this.handleMessage(data.success, data.data.message);
            }
        }).catch(error => {
            this.handleMessage(false, error.message);
        });
    }

    render() {
        return(
            <div id="editmenu">
                <h3>Gestione Menu</h3>
                <Servermessage success={this.state.success} message={this.state.message} />
                <div id="adminpanel">
                    <div>
                        <Addfood cb={this.handleAdd} cbMessage={this.handleMessage} />
                        <Editfood cb={this.handleUpdate} cbMessage={this.handleMessage} />
                    </div>
                    <div>
                        <h4>Elimina pietanze</h4>
                        <Menu data={this.state.menu} admin={true} cbDelete={this.handleDelete} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Menupanel;