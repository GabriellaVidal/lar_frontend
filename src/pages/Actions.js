import React, { Component } from 'react';
import { isAuthenticated } from '../services/auth'; 
import { Redirect } from 'react-router'
import Footer from '../components/Footer';


import Example from '../components/plugin/example';
import CreateFunction from '../components/plugin/createFunction';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import api from "../services/api";

import "../components/Action.css" 

class Actions extends Component { 
    constructor(props){ 
        super(props);
        this.id = this.props.location.search.replace("?", "");
        this.state = {
            selectedIdUser: "",
            selectedIdDevice: "", 
            devices: [],
            selectedDevice: "",
            users: [], 
            error: "",
            authorization: []
        };
    }

    populateAuthorization = async () => {

        const request = await api.put('/authorization/'+this.id);
        if(request !== undefined){
            this.setState({authorization: request.data.authorization}); 
        }
    }


    async componentDidMount() {

        if (isAuthenticated()) {
            document.title = "Ações";
            await this.populateAuthorization(); 
        }
    }
    
    async criarFuncao() {
        console.log("kjfcd");
        document.getElementId("function-box")
            .setAttribute('style', 'display: block');;
    }

    async playCarrinho() {
        const buttons = document.getElementById("selectedBox")
            .getElementsByTagName( 'button' );
        const comandos = [];
        for (var i = buttons.length - 1; i >= 0; i--) {
            comandos[i] = buttons[i].getAttribute('name');
        }
        console.log(this.state.authorization);
        if(comandos.length > 0){
            const response = await api.put("/device/movimentar/", {
                device: this.state.authorization.device_id, 
                user: this.state.authorization.user_id, 
                value: JSON.stringify(comandos)
            });
            console.log(response);
        } else{
           alert("Comandos não foram enviados!");  
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
            <div >
                { (!isAuthenticated() ) ? 
                    <Redirect to="/login"/> : 
                    <div className="container cardauth">
                        <div className="row">
                            <DndProvider backend={HTML5Backend}>
                                <Example/>
                            </DndProvider>
                        </div>
                        <div className="row">
                            <div className="container">
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-info" onClick={()=> this.playCarrinho()}>
                                        <i className="fa fa-play" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer></Footer>
            </div>
        );
    }
}

export default Actions; 