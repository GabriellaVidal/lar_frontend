import React, { Component } from 'react';
import { isAuthenticated } from '../services/auth'; 
import { Redirect } from 'react-router'
import Footer from '../components/Footer'; 

import Dustbin from '../components/plugin/Dustbin';
import Box from '../components/plugin/Box';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import api from "../services/api";

import "../components/Action.css" 

class Actions extends Component { 
    constructor(props){ 
        super(props);
    
    }

    populateAuthorizations = async () => {
        const request = await api.get('/authorization/full');
        if(request !== undefined){
            this.setState({authorizations: request.data.authorizations}); 
            console.log(this.state.authorizations); 
        }
    }

    async componentDidMount() {

        if (isAuthenticated()) {
            document.title = "Autorizações";
            await this.populateAuthorizations();  
        }
    }

    render() {
        return ( 
            <div >
                { (!isAuthenticated() ) ? 
                <Redirect to="/login"/> : 
                <div className="container"> 
                    <div className="card">
                        <div className="card-body">
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
                        <div>
                            <DndProvider backend={HTML5Backend}>
                                <div>
                                  <div style={{ overflow: 'hidden', clear: 'both' }}>
                                    <Dustbin />
                                  </div>
                                  <div style={{ overflow: 'hidden', clear: 'both' }}>
                                    <Box classe='btn btn-success' content='<i class="fa fa-arrow-up" aria-hidden="true"></i>' />
                                    <Box classe='btn btn-danger' content='<i class="fa fa-stop" aria-hidden="true"></i>' />
                                    <Box classe='btn btn-success' content='<i class="fa fa-arrow-down" aria-hidden="true"></i>' />
                                  </div>
                                </div>
                            </DndProvider>
                        </div>
                    </div>
                </div>
                }
            <Footer>

            </Footer>
            </div>
        );
    }
}

export default Actions; 
