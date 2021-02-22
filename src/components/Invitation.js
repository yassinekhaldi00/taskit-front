import React from "react";
import axios from 'axios';


export default function Invitation(props){

    const taskTitle = props.invitation.task.title;
    const senderEmail = props.invitation.sender.email;
    const title = `${taskTitle} - shared by ${senderEmail}`;

    async function acceptInvitation(){
        await axios.post(`invitation/accept/${props.invitation.id}`)
            .then(res=>{
                console.log(res);
            }).catch(erreur=>{
                console.log(erreur);
            })
            props.loadInvitations();
            props.loadTasks();
    }

    async function deleteInvitation(){
        await axios.delete(`invitation/${props.invitation.id}`)
            .then(res=>{
                console.log(res);
            }).catch(erreur=>{
                console.log(erreur);
            })
            props.loadInvitations();
    }

    return(
        <div className="invitation-container">
            <div className="invitation">
                <p>{title}</p>
                <div className="btn-invitation-container">
                    <button className="btn-invitation accept" onClick={acceptInvitation}>Accept</button>
                    <button className="btn-invitation denie" onClick={deleteInvitation}>Delete</button>
                </div>
            </div>
        </div>
    )
}