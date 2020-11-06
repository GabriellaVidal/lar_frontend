import React, { Component } from 'react';
import { isAuthenticated } from '../services/auth'; 
import { Redirect } from 'react-router'
import swal from 'sweetalert';
import Footer from '../components/Footer';


import Example from '../components/plugin/example';
import CreateFunction from '../components/plugin/createFunction';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// import { TouchBackend } from 'react-dnd-touch-backend'

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
            document.title = "Programar com blocos";
            await this.populateAuthorization(); 
            // this.subscribe();
        }
    }

    // async subscribe() {
    //     // setInterval(function() { 
    //         const response = await api.put("/device/retornoCarrinho/", {
    //             device: this.state.authorization.device_id, 
    //             user: this.state.authorization.user_id
    //         });
    //         console.log(response);
    //         console.log(response.data);
    //     // }, 0);
    // }
    
    async criarFuncao() {
        console.log("kjfcd");
        document.getElementId("function-box")
            .setAttribute('style', 'display: block');;
    }

    async playCarrinho() {
        const items = document.getElementById("boxPreenchido").childNodes;
        // const buttons = document.getElementById("BoxPreenchido").getElementsByTagName( 'button' );
        const botaoPlay = document.getElementById("botaoPlay");
        botaoPlay.setAttribute('disabled', true);

        const comandos = [];
        for (var i = items.length - 1; i >= 0; i--) {
            if(items[i].classList.contains('btn')){
                const comandoNome = items[i].getAttribute('name');
                if(comandoNome == 'multiple'){
                    const quantidade = items[i+1].value;
                    for (var j = 0; j < parseInt(quantidade) - 1; j++) {
                        comandos.push({
                            'comando':items[i-2].getAttribute('name'),
                            'index': i,
                            'classOrigin': items[i].classList[1],
                            'type': comandoNome
                        });
                    }
                    items[i+1].setAttribute('disabled', true);
                    items[i].classList.remove("btn-warning");
                    items[i].classList.add("btn-default");
                } else {
                    comandos.push({
                        'comando': items[i].getAttribute('name'),
                        'index': i,
                        'classOrigin': items[i].classList[1],
                        'type': comandoNome
                    });
                    items[i].classList.remove("btn-success");
                    items[i].classList.add("btn-default");
                }
            }
        }
        comandos.reverse()
        console.log(comandos)
        if(comandos.length > 0){
            for (var i in comandos){
                const response = await api.put("/device/movimentar/", {
                    device: this.state.authorization.device_id, 
                    user: this.state.authorization.user_id, 
                    value: JSON.stringify(comandos[i].comando)
                });
                console.log(response);
                console.log(response.data);
                if(response.data.subscribe == 'feito'){
                    items[comandos[i].index].classList.remove("btn-default");
                    items[comandos[i].index].classList.add(comandos[i].classOrigin);
                    if(comandos[i].type == 'multiple'){
                        items[comandos[i].index+1].removeAttribute('disabled');
                    }
                }
                if(i == comandos.length-1){
                    botaoPlay.removeAttribute('disabled');
                    this.finalizado();
                }
            }
        } else{
           swal("OPs!", "Comandos não foram enviados!", "error");  
        }
    }

    async finalizado(){
        const response = await api.put("/device/movimentar/", {
                    device: this.state.authorization.device_id, 
                    user: this.state.authorization.user_id, 
                    value: JSON.stringify("finalizado")
                });
        console.log('response.data.subscribe', response.data.subscribe);
        if(response.data.subscribe == 'feito' || response.data.subscribe == 'VERMELHO' || response.data.subscribe == 'VERDE' || response.data.subscribe == 'AZUL' || response.data.subscribe == 'PRETO'){
            const mensagem = response.data.subscribe != 'feito' ? "Trajeto Finalizado! Você checgou no destino "+response.data.subscribe+"! " : "Trajeto Finalizado!";
            swal("Parabéns!", mensagem, "success");
        } else {
            swal("OPs!", "Problemas ao finalizar", "error");
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
                                    <button type="button" className="btn btn-info" id="botaoPlay" onClick={()=> this.playCarrinho()}>
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