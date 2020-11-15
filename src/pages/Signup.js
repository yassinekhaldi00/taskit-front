import React from 'react';
import './signup.css';

function Signup(){
    return(
        <div className='signup-container' >
            <form className ='signup-form'>
                <h3>Create Your Account</h3>
                <input type='text' name='firstName' placeholder='First Name'/>
                <input type='text' name='lastName' placeholder='Last Name'/>
                <input type='text' name='email' placeholder='Email'/>
                <input type='password' name='password' placeholder='Password'/>
                <div className='agree'>
                    <input type='checkbox' name='agree' />
                    <label>Agree to Terms & Conditions</label>
                </div>
                <input type='submit' value='Sign up'/>
            </form>
        </div>
    )
}

export default Signup;