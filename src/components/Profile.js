import Axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios';

export default function Profile(props){
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [email, setEmail] = useState(props.user.email);
    const [settingChanged, setSettingChanged] = useState(false);

    async function handlesubmit() {
        const  data = {
            id: props.user.id,
            email: email,
            firstName: firstName,
            lastName: lastName
        }
        await axios.put('user', data)
            .then(res=>{
                props.addUserToLocalStorage(res.data);
                setSettingChanged(true);
            })
    }

    return(
        <div className="profile-container">
            <h1>Change Profile settings</h1>
            <hr/>
            {settingChanged && <p className="setting-changed">Your profile setting is changed</p>}
            <div className="input-container">
                <label>First Name</label>
                <input type='text' value={firstName} onChange={e=>setFirstName(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Last Name</label>
                <input type='text'value={lastName} onChange={e=>setLastName(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Email</label>
                <input type='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <button className="submit-profile" onClick={handlesubmit}>Submit</button>
        </div>
    )
}