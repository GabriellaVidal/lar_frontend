import React, { Component } from 'react';
import api from "../services/api";
import Button from 'react-bootstrap/Button';

import '../pages/Authorization.css'

class AuthorizationCard extends Component { 
    constructor(props){
        super(props); 
        this.state = {
            id: "",
            enabled: false,
            device_id: "",
            device_name: "",
            user_id: "",
            user_name:""
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
        this.setState(this.props.children); 
    }
    
    async handleSubmit(e){
        e.preventDefault();
 
 
        console.log(this.state.id+" "+this.state.device_name+" "+this.state.user_name); 
    
        try {
            const response = await api.delete("/authorization/"+this.state.id);
 
            if ( response.data.result === "ok" ){
                alert("Autorização apagada com sucesso!"); 
            }
            console.log(response.data); 
    
        }
        catch (err) {
            console.log(err); 
            this.setState({
                error:
                    "Houve um problema ao apagar a autorização."
                });
        }
    }

    render() {
        return (
            <div>
            <div className="cardauth cardauth-mobile">
                <div className="card-info">     
                    <span> Dispositivo: {this.state.id} </span> 
                    <span> Dispositivo: {this.state.device_name} </span> 
                    <span className="user"> Usuário: {this.state.user_name} </span> 
                <div className="acoes">
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-danger ml-unset">
                            <i class="fa fa-trash" aria-hidden="true"></i> Deletar 
                        </button> 
                    </form> 
                    <Button href={'actions?'+this.state.id} type="button" className="btn btn-success"><i class="fa fa-cubes" aria-hidden="true"></i> Montar trajetórias</Button> 
                </div>
                </div>
            </div>
            <div className="cardauth cardauth-desktop ">
                <div className="card-info col-sm-5">     
                    <span> Dispositivo: {this.state.id} </span> 
                    <span> Dispositivo: {this.state.device_name} </span> 
                    <span className="user"> Usuário: {this.state.user_name} </span> 
                </div>
                <div className="acoes col-sm-7 justify-content-flex-end">
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-danger pull-right">
                            <i class="fa fa-trash" aria-hidden="true"></i> Deletar 
                        </button> 
                    </form> 
                    <Button href={'actions?'+this.state.id} type="button" className="btn btn-success pull-right mr-unset"><i class="fa fa-cubes" aria-hidden="true"></i> Montar trajetórias</Button> 
                </div>
            </div>
            </div>
        );
    }
}

export default AuthorizationCard; 