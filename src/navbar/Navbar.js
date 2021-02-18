import React, { useState} from 'react';
import{NavLink} from 'react-router-dom'
import '../style/navbar.css';
import logo from '../images/logo.png';
import Avatar  from 'react-avatar';


function Navbar(props){

    const [dropMenu, setDropMenu] = useState(false);
    const user = JSON.parse(props.user);
    const userName = props.user ? user.firstName + " " + user.lastName : ""; 

    function MenuItems(){

        if(props.user){
            return (
                <ul>
                    <li><NavLink className='link' to ='/taskdisplay'> Home </NavLink></li>
                    <li><NavLink className='link' to ='/setting'> 
                        <Avatar className ="avatar" name={userName} size="28" round={true} textSizeRatio={2.3} color="#F39595"/>{
                        user.firstName}
                    </NavLink></li>
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
                <div className = 'logo' >
                    <img src= {logo} alt="logo"/>
                    <h4>TASKIT</h4>
                </div>
                <div className ="bar"><i className="material-icons" onClick={()=> setDropMenu(!dropMenu)}>{dropMenu ? 'clear' : 'list' }</i></div>
                <div className = {dropMenu ?'nav-list-drop': 'nav-list'}>
                    <MenuItems/>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;