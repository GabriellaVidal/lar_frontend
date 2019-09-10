import React, { Component } from 'react';
import Dustbin from './plugin/Dustbin';
import Box from './plugin/Box';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import api from "../services/api";

import './Authorization.css'

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

    async clickAndar(deviceId, userId){

        let device = deviceId; 
        let user = userId; 
        const enabled = "andar"; 
        try {
            const response = await api.put("/device/movimentar/", {device: device, user: user, value: enabled});

            if ( response.data.result === "ok" ){
                alert("Andar com sucesso!"); 
            }
            // console.log(response.data); 
                
        } catch (err) {
            // console.log(err);
            this.setState({
            error:
                "Houve um problema no cadastro de autorização."
            });
        }

        if (  this.state.error !== 0  ){
            // alert(this.state.error);
            console.log("Error:"+this.state.error+"!");
        } 
    }

    async clickParar(deviceId, userId){

        let device = deviceId; 
        let user = userId; 
        const enabled = "parar"; 
        try {
            const response = await api.put("/device/movimentar/", {device: device, user: user, value: enabled});

            if ( response.data.result === "ok" ){
                alert("Parar sucesso!"); 
            }
            // console.log(response.data); 
                
        } catch (err) {
            // console.log(err);
            this.setState({
            error:
                "Houve um problema no cadastro de autorização."
            });
        }

        if (  this.state.error !== 0  ){
            // alert(this.state.error);
            console.log("Error:"+this.state.error+"!");
        } 
    }

    async clickDireita(deviceId, userId){

        let device = deviceId; 
        let user = userId; 
        const enabled = "andarDireita"; 
        try {
            const response = await api.put("/device/movimentar/", {device: device, user: user, value: enabled});

            if ( response.data.result === "ok" ){
                alert("Virar com sucesso!"); 
            }
            // console.log(response.data); 
                
        } catch (err) {
            // console.log(err);
            this.setState({
            error:
                "Houve um problema no cadastro de autorização."
            });
        }

        if (  this.state.error !== 0  ){
            // alert(this.state.error);
            console.log("Error:"+this.state.error+"!");
        } 
    }

    async clickEsquerda(deviceId, userId){

        let device = deviceId; 
        let user = userId; 
        const enabled = "andarEsquerda"; 
        try {
            const response = await api.put("/device/movimentar/", {device: device, user: user, value: enabled});

            if ( response.data.result === "ok" ){
                alert("Virar com sucesso!"); 
            }
            // console.log(response.data); 
                
        } catch (err) {
            // console.log(err);
            this.setState({
            error:
                "Houve um problema no cadastro de autorização."
            });
        }

        if (  this.state.error !== 0  ){
            // alert(this.state.error);
            console.log("Error:"+this.state.error+"!");
        } 
    }

    async clickRe(deviceId, userId){

        let device = deviceId; 
        let user = userId; 
        const enabled = "re"; 
        try {
            const response = await api.put("/device/movimentar/", {device: device, user: user, value: enabled});

            if ( response.data.result === "ok" ){
                alert("Virar com sucesso!"); 
            }
            // console.log(response.data); 
                
        } catch (err) {
            // console.log(err);
            this.setState({
            error:
                "Houve um problema no cadastro de autorização."
            });
        }

        if (  this.state.error !== 0  ){
            // alert(this.state.error);
            console.log("Error:"+this.state.error+"!");
        } 
    }

    render() {
        return (
            <div className="cardauth">
                <div className="card-info col-sm-8">     
                    <span> Dispositivo: {this.state.device_name} </span> 
                    <span className="user"> Usuário: {this.state.user_name} </span> 
                </div>
                <div class="col-sm-2">
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Deletar 
                        </button> 
                    </form>
                </div>
                <div class="col-sm-2">
                    <a href="actions" type="button" className="btn btn-success">
                        Ações
                    </a> 
                </div>
            </div>
        );
    }
}

export default AuthorizationCard; 