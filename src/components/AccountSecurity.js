import React, { useState } from 'react';
import axios from "axios";

export default function AccountSecurity(props){
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    const [wrongPassword, setWrongPassword] = useState(false);
    const [rightPassword, setRightPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    async function handleSubmit(){
        if(newPassword === confirmNewPassword){
            const data = {
                id: props.user.id,
                password: password,
                newPassword: newPassword
            }
            await axios.put('user/changePassword',data)
                .then(res=>{
                    setWrongPassword(!res.data);
                    setRightPassword(res.data);
                })
        }else{
            setPasswordMatch(false)
        }
    }

    return(
        <div className="security-container">
            <h1>Change Password</h1>
            <hr/>
            {wrongPassword && <p className="wrong-password">Wrong Password</p>}
            {rightPassword && <p className="right-password">Your password is changed</p>}
            {!passwordMatch && <p className="password-match">Passwords don't match</p>}
            <div className="input-container">
                <label>Current Password</label>
                <input type='password' onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>New Password</label>
                <input type='password' onChange={e=>setNewPassword(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Confirm new Password</label>
                <input type='password' onChange={e=>setConfirmNewPassword(e.target.value)}/>
            </div>
            <button className="submit-profile" onClick={handleSubmit}>Submit</button>
        </div>
    )
    
}