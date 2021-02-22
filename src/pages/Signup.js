import React, { useState } from 'react';
import '../style/signup.css';
import {useHistory, withRouter} from 'react-router-dom';
import axios from 'axios';
import { RandomColor } from '../util/RandomColor';

function Signup(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [firstCheck, setFirstCheck] = useState(true);
    const [accountExist, setAccountExist] = useState(false);



    let history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        const data ={
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            color: RandomColor()
        }
        if(checkbox){
            await axios.post('user/signup', data)
            .then(res =>{
                if(res.data.valid){
                    localStorage.setItem('token',res.data.jwt);
                    props.addUserToLocalStorage(res.data);
                    history.push('/taskDisplay');
                }
                else{
                    setAccountExist(true);
                }
            }).catch(erreur =>{
                console.log(erreur);
            })
        }else{
            setFirstCheck(false);
        }
        
    }

    return(
        <div className='signup-container' >
            <form className ='signup-form' onSubmit={handleSubmit}>
                <h3>Create Your Account</h3>
                {accountExist && <p>An account already exists with this email address</p>}
                <input type='text' name='firstName' placeholder='First Name' onChange={e=> setFirstName(e.target.value)}/>
                <input type='text' name='lastName' placeholder='Last Name' onChange={e=> setLastName(e.target.value)}/>
                <input type='email' name='email' placeholder='Email' onChange={e=> setEmail(e.target.value)}/>
                <input type='password' name='password' placeholder='Password' onChange={e=> setPassword(e.target.value)}/>
                <div className='agree'>
                    <input type='checkbox' name='agree' onChange={e=>setCheckbox(e.target.checked)}/>
                    <label>Agree to Terms & Conditions</label>
                </div>
                {checkbox || firstCheck ? null : <p>You must agree to Terms & Conditions</p> }
                <input type='submit' value='Sign up'/>
            </form>
        </div>
    )
}

export default withRouter(Signup);