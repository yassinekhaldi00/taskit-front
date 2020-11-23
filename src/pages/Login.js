import React, { useState } from 'react';
import '../style/login.css'
import welcome from '../images/welcome.svg';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Login(props){
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [validUser, setValidUser] = useState(true)

    let history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        await axios.post('user/authenticate', data)
            .then(res =>{
                setValidUser(true);
                localStorage.setItem('token',res.data.jwt);
                props.addUserToLocalStorage(res.data);
                history.push('/taskDisplay');
            }).catch(err =>{
                setValidUser(false);
            })
    }

    return(
        <div className='login-container' >
        <form className ='login-form' onSubmit={handleSubmit}>
            <img src={welcome} alt='welcome'/>
            <input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
            <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            {validUser ? null : <p>Incorrect email or password</p> }
            <input type='submit' value='Login'/>
        </form>
    </div>
    )
}

export default Login;