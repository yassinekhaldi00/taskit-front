import React from 'react';
import{NavLink} from 'react-router-dom'
import './navbar.css';
import logo from '../images/logo.png';

function Navbar(){
    return(
        <div className ='navbar-container' >
            <nav>
                <div className = 'logo'>
                    <img src= {logo} alt="logo"/>
                    <h4>TASKIT</h4>
                </div>
                <div className = 'nav-list'>
                    <ul>
                        <li><NavLink className='link' to='/'> Home </NavLink></li>
                        <li><NavLink className='link' to='/Login'> Login </NavLink></li>
                        <li className='signup'><NavLink className='link'to='/Signup'> SignUp </NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;