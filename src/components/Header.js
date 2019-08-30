import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown'
import './Header.css'; 

import logo from '../assets/iot.svg'

export default function Header() {
    return (
        <header id="main-header">
            <div className="header-content">
	            <Dropdown>
				  	<Dropdown.Toggle variant="" id="dropdown-basic">
						<i class="fa fa-bars" aria-hidden="true"></i>
				  	</Dropdown.Toggle>

				  	<Dropdown.Menu>
				    	<Dropdown.Item href="user">Users</Dropdown.Item>
				    	<Dropdown.Item href="devices">Devices</Dropdown.Item>
				    	<Dropdown.Item href="authorizations">Authorization</Dropdown.Item>
				  	</Dropdown.Menu>
				</Dropdown>
                <h1>Acesso - IoT </h1>
                <img src={logo} width="60" alt="IoTSystem" />
                
            </div> 
        </header> 
    ); 
}