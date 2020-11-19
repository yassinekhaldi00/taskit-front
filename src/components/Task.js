import React, { useState } from 'react';
import check from '../images/check.png';
import expandImage from '../images/expand.png';
import Delete from '../images/delete.png';

export default function Task(props){

    const [expand, setExpand] = useState(false);

    return(
        <div className='task-container'>
            <div className='task' id = {props.task.id}>
                <input type='text' value={props.task.title} onChange={event=>props.task.title=event.target.value} disabled/>
                <div className='img-container'>
                    <img className={expand ? 'up': 'down'} src={expandImage} alt='expand' onClick={()=>setExpand(!expand)}/>
                    <img className={props.checkButton} src={check} alt='check' onClick={()=>props.checkTask(props.task.id)}/>
                    <img className='delete-button' src={Delete} alt='delete' onClick={()=>props.deleteTask(props.task.id)}/>
                </div>
            </div>
            <textarea className={expand ? 'expand-desc' : 'desc'}  value={props.task.description} onChange={event=>props.task.description=event.target.value} disabled></textarea>
        </div>
    )
}