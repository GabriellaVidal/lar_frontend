import React, { Component } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import api from "../services/api";

import './Authorization.css'

const style: React.CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const Dustbin: React.FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  // return (
  //   <div ref={drop} style={{ ...style, backgroundColor }}>
  //     {isActive ? 'Release to drop' : 'Drag a box here'}
  //   </div>
  // )
}

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

                    <div className="card-info">     
                        <span> Dispositivo: {this.state.device_name} </span> 
                        <span className="user"> Usuário: {this.state.user_name} </span> 
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Deletar 
                        </button> 
                    </form>
                    <div class="row align-items-center">
                        <button type="button" className="btn btn-success"onClick={()=> this.clickEsquerda(this.state.device_id, this.state.user_id)} value="{this.state.device_id}">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                        </button> 
                    </div>
                    <div class="row setas-grid">
                        <button type="button" className="btn btn-success" onClick={()=> this.clickAndar(this.state.device_id, this.state.user_id)}>
                            <i class="fa fa-arrow-up" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="btn btn-danger"onClick={()=> this.clickParar(this.state.device_id, this.state.user_id)} value="{this.state.device_id}">
                            <i class="fa fa-stop" aria-hidden="true"></i>
                        </button> 
                        <button type="button" className="btn btn-success"onClick={()=> this.clickRe(this.state.device_id, this.state.user_id)} value="{this.state.device_id}">
                            <i class="fa fa-arrow-down" aria-hidden="true"></i>
                        </button> 
                    </div>
                    <div class="row align-items-center">
                        <button type="button" className="btn btn-success"onClick={()=> this.clickDireita(this.state.device_id, this.state.user_id)} value="{this.state.device_id}">
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>

            </div>
            <div ref={drop} style={{ ...style, backgroundColor }}>
                {isActive ? 'Release to drop' : 'Drag a box here'}
            </div> 
        );
    }
}

export default AuthorizationCard; 