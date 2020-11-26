import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Modal from 'react-awesome-modal';

export default function Account(props){

    const [password, setPassword] = useState();
    const [popup, setPopup] = useState(false);

    let history = useHistory();

    async function handleSubmit(){
        const data = {
            id: props.user.id,
            password: password
        }
        await axios.delete('user',{ data: data})
            .then(res=>{
                if(res.data){
                    props.DelUserFromLocalStorage();
                    history.push('/Login');
                }
            }).catch(err=>{
                props.DelUserFromLocalStorage();
            })
    }

    return(
        <div className="account-container">
            <h1>Delete account</h1>
            <hr/>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            <button onClick={()=>setPopup(true)}>Delete your account</button>
            <Modal visible={popup} width="400" height="150" onClickAway={() => setPopup(false)}>
                <div className='popup'>
                    <p>Enter your password</p>
                    <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    <div className="popup-button">
                        <button onClick={handleSubmit}>Delete account</button>
                        <button className="exit-button"onClick={()=>setPopup(false)}>Exit</button>
                    </div>
                </div>
            </Modal>
        </div>

    )
}
