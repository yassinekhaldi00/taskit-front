import React from 'react';
import './login.css'
import welcome from '../images/welcome.svg';

function Login(){
    return(
        <div className='login-container' >
        <form className ='login-form'>
            <img src={welcome} alt='welcome'/>
            <input type='text' name='email' placeholder='Email'/>
            <input type='password' name='password' placeholder='Password'/>
            <input type='submit' value='Login'/>
        </form>
    </div>
    )
}

export default Login;