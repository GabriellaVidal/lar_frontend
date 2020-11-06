import React, { Component } from 'react';  
import { Redirect } from 'react-router-dom'
import { logout } from "../services/auth"; 
import { getUserName } from "../services/auth";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import './Footer.css'; 

class Footer extends Component { 
    constructor(props){
        super(props);
        //this.makeLogout = this.makeLogout.bind(this); 
        this.state = {
            userName: "Orivaldo",
            redirect: false
        }
    }

    makeLogout = () => {

        logout(); 
        //this.props.history.push("/login");
        this.setState({
            redirect: true
        })
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/target' />
        }
    }

    async componentDidMount() {
        this.setState({userName: getUserName()}); 
        // console.log("footer: "+getUserName() ); 
    }

    async redirecionamentosFooterMenu(url){
        return window.location.href = "/"+url;
    }

    render() {
        return (
            
            <footer>
                {this.renderRedirect()}
                 <ButtonGroup aria-label="Basic example">
                  <Button type="button" variant="secondary" onClick={()=> this.redirecionamentosFooterMenu('user')}><i class="fa fa-cubes fa-lg" aria-hidden="true"></i> Montar trajetórias</Button>
                  <Button type="button" variant="secondary" onClick={()=> this.redirecionamentosFooterMenu('devices')}><i class="fa fa-rocket fa-lg" aria-hidden="true"></i> Novo Robô</Button>
                  <Button type="button" variant="secondary" onClick={()=> this.redirecionamentosFooterMenu('authorizations')}><i class="fa fa-check fa-lg" aria-hidden="true"></i> Autorizações</Button>
                </ButtonGroup>
                {/*<div className="footer-content">
                    <p>{this.state.userName}</p>
                    
                    <button type="submit" className="btn btn-link" onClick={this.makeLogout}>
                            Sair
                    </button> 
                </div>*/}

            </footer>
        )
    };


}


export default Footer; 