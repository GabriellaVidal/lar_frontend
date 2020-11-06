import Dropdown from 'react-bootstrap/Dropdown'
import './Header.css'; 
import React, { Component } from 'react';  
import { Redirect } from 'react-router-dom'
import { logout } from "../services/auth"; 
import { getUserName } from "../services/auth";
import { isAuthenticated } from '../services/auth'; 

import logo from '../assets/ureto.svg'
import user from '../assets/do-utilizador.svg'

// export default function Header() {
//     return (
//         <header id="main-header">
//             <div className="header-content">
//                 <img src={logo} width="60" alt="IoTSystem" />
//                 <h1>URETO</h1>
// 	            <Dropdown>
// 				  	<Dropdown.Toggle variant="" id="dropdown-basic">
// 						<i className="fa fa-bars" aria-hidden="true"></i>
// 				  	</Dropdown.Toggle>

// 				  	<Dropdown.Menu>
// 				    	<Dropdown.Item href="/user">Usuários</Dropdown.Item>
// 				    	<Dropdown.Item href="/devices">Robôs</Dropdown.Item>
// 				    	<Dropdown.Item href="/authorizations">Autorizações</Dropdown.Item>
// 				  	</Dropdown.Menu>
// 				</Dropdown>
// 				<Dropdown>
// 				  	<Dropdown.Toggle variant="" id="dropdown-basic">
// 						 <img src={logo} width="60" alt="IoTSystem" />
// 				  	</Dropdown.Toggle>

// 				  	<Dropdown.Menu>
// 				    	<Dropdown.Item>Robôs</Dropdown.Item>
// 				    	<Dropdown.Divider />
// 				    	<Dropdown.Item onClick={this.makeLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Sair</Dropdown.Item>
// 				  	</Dropdown.Menu>
// 				</Dropdown>
//             </div> 
//         </header> 
//     ); 
// }

class Header extends Component { 
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
        console.log("footer: "+getUserName() ); 
    }

    render() {
        return (
            
            <header id="main-header">
	            <div className="header-content">
	            	<div className="pull-left logo">
	                	<img src={logo} width="60" alt="IoTSystem" />
	                	<h3>URETO</h3>
	            	</div>
		            {/*<Dropdown>
					  	<Dropdown.Toggle variant="" id="dropdown-basic">
							<i className="fa fa-bars" aria-hidden="true"></i>
					  	</Dropdown.Toggle>

					  	<Dropdown.Menu>
					    	<Dropdown.Item href="/user">Usuários</Dropdown.Item>
					    	<Dropdown.Item href="/devices">Robôs</Dropdown.Item>
					    	<Dropdown.Item href="/authorizations">Autorizações</Dropdown.Item>
					  	</Dropdown.Menu>
					</Dropdown>*/}
					{
						isAuthenticated() ?
						<Dropdown>
						  	<Dropdown.Toggle variant="transparent" id="dropdown-basic">
								<img src={user} width="60" alt="IoTSystem" />
						  	</Dropdown.Toggle>
						  	<Dropdown.Menu>
						  		<Dropdown.Header>
						  			<div className="info-user">
						  				<img src={user} width="60" alt="IoTSystem" />
						  				<h4>{this.state.userName}</h4>
						  			</div>
						  		</Dropdown.Header>
						    	<Dropdown.Divider />
						    	<Dropdown.Item onClick={this.makeLogout} className="teste"><i className="fa fa-sign-out" aria-hidden="true"></i> Sair</Dropdown.Item>
						  	</Dropdown.Menu>
						</Dropdown>
						: ''
					}
	            </div> 
	        </header>
        )
    };


}


export default Header; 