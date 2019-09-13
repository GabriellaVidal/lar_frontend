import React, { Component, useState, useCallback } from 'react';
import { isAuthenticated } from '../services/auth'; 
import { Redirect } from 'react-router'
import Footer from '../components/Footer'; 

import Example from '../components/plugin/example';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import api from "../services/api";

import "../components/Action.css" 

class Actions extends Component { 
    constructor(props){ 
        super(props);
    }

    populateAuthorization = async () => {
        const request = await api.get('/authorization/full');
        if(request !== undefined){
            this.setState({authorizations: request.data.authorizations}); 
            console.log(this.state.authorizations); 
        }
    }

    async componentDidMount() {

        if (isAuthenticated()) {
            document.title = "Ações";
            await this.populateAuthorization();  
        }
    }

    render() {
        return ( 
            <div >
                { (!isAuthenticated() ) ? 
                    <Redirect to="/login"/> : 
                    <div className="container">
                        <div className="card-body">
                            <div class="row">
                                <button type="button" className="btn btn-info">
                                    <i class="fa fa-play" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="row">
                                <DndProvider backend={HTML5Backend}>
                                    <Example/>
                                </DndProvider>
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

                                    // #<button type="button" className="btn btn-info" onClick={()=> this.getComandos(this.state.device_id)}">