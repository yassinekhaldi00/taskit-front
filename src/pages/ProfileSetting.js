import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../style/profileSetting.css';
import Profile from "../components/Profile";
import AccountSecurity from "../components/AccountSecurity";
import Account from '../components/Account';

export default function ProfileSettings(props){
    const user = JSON.parse(props.user);
    const[liClicked, setLiClicked] = useState(0);

    return (
        <div className='setting-container'>
            <ul className="setting-links">
                <li className={liClicked===0? "clicked-link" :null} onClick={()=>setLiClicked(0)}>Profile</li>
                <li className={liClicked===1? "clicked-link" :null}  onClick={()=>setLiClicked(1)}>Account Security</li>
                <li className={liClicked===2? "clicked-link" :null} onClick={()=>setLiClicked(2)}>Account</li>
            </ul>
            <div className="form-container">
                {liClicked === 0 && <Profile user={user} addUserToLocalStorage={props.addUserToLocalStorage}/>}
                {liClicked === 1 && <AccountSecurity user={user}/>}
                {liClicked === 2 && <Account user={user} DelUserFromLocalStorage={props.DelUserFromLocalStorage}/>}
            </div>
        </div>
    )
}
