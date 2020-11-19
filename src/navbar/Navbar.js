import React, { useState , useEffect} from 'react';
import{NavLink} from 'react-router-dom'
import '../style/navbar.css';
import logo from '../images/logo.png';


function Navbar(props){

    function MenuItems(){

        if(props.user){
            return (
                <ul>
                    <li><NavLink className='link' to='/'> {JSON.parse(props.user).firstName} </NavLink></li>
                    <li className='signup'><NavLink className='link'to='/Login' onClick={props.DelUserFromLocalStorage}>Logout </NavLink></li>
                </ul>
            )
        }else{
            return(
                <ul>
                    <li><NavLink className='link' to='/'> Home </NavLink></li>
                    <li><NavLink className='link' to='/Login'> Login </NavLink></li>
                    <li className='signup'><NavLink className='link'to='/Signup'> Signup </NavLink></li>
                </ul>
            )
        }
    }
    return(
        <div className ='navbar-container' >
            <nav>
                <div className = 'logo'>
                    <img src= {logo} alt="logo"/>
                    <h4>TASKIT</h4>
                </div>
                <div className = 'nav-list'>
                    <MenuItems/>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;