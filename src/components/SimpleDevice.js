import React, { Component } from 'react';  
import api from "../services/api";
import Button from 'react-bootstrap/Button';


import './SimpleDevice.css'



class SimpleDevice extends Component { 
    constructor(props){
        super(props); 
        this.state = {
            name: "", 
            status: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.deviceState = 1; 
    }

    
    componentDidMount() {
        this.setState(this.props.children); 
    }
    
    async handleSubmit(e){
        e.preventDefault();
        this.deviceState = ! this.deviceState;
        let valueToSend = "" 
        this.deviceState ? valueToSend = "f" : valueToSend = "v";  
        console.log(this.state.name+" "+this.deviceState+" "+this.state.device_id); 
        try {
            const response = await api.post("/device/"+this.state.device_id+"/", {
                value: valueToSend
            });
            this.setState({ status: "Comando enviado!" }); 
            if ( response.data.result === "ok" ){
                alert("Comando enviado com sucesso!"); 
            }
            console.log(response.data); 
    
        }
        catch (err) {
            console.log(err); 
            this.setState({
                error:
                    "Houve um problema com o envio do comando para o dispositivo IoT."
                });
        } 
    }

    render() {
        return (
            <div className="device">
                  <header> 
                    <div className="device-info">     
                        <span> {this.state.name} </span> 
                    </div>
                    {/*<form onSubmit={this.handleSubmit}>
                        <button type="submit" className="btn btn-primary">
                            
                            {this.deviceState ? "Acionar" : "Deligar" }
                        </button> 
                    </form>*/} 
                    <Button href={'actions?'+this.state.id} type="button" className="btn btn-success pull-right mr-unset"><i class="fa fa-cubes" aria-hidden="true"></i> Montar trajetórias</Button> 
                  </header>
            </div> 
        );
    }
}

export default SimpleDevice; 