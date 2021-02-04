import React, { useState } from 'react';
import check from '../images/check.png';
import expandImage from '../images/expand.png';
import Delete from '../images/delete.png';
import menuImage from '../images/menu.png';
import renameImage from '../images/rename.svg';
import deleteImage from '../images/delete.svg';
import moveImage from '../images/move.svg';

export default function Task(props){

    const [expand, setExpand] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMove, setOpenMove] = useState(false)

    function MoveList(taskState){
        let list = ["todo","doing", "done"]
        for  (const item in list) {
            if (item === taskState){
                return (
                    <ul className="move-li">
                        <li>doing</li>
                        <li>done</li>
                    </ul>
                )
            }   
        }
    }


    return(
        <div className='task-container'>
            <div className='task' id = {props.task.id}>
                <input type='text' value={props.task.title} onChange={event=>props.task.title=event.target.value} disabled/>
                <div className='img-container'>
                    <img className={expand ? 'up': 'down'} src={expandImage} alt='expand' onClick={()=>setExpand(!expand)}/>
                    <img className={props.checkButton} src={menuImage} alt='menu' onClick={()=>setOpenMenu(!openMenu)}/>
                </div>
            </div>
            {openMenu && 
                <div className="menu-container">
                    <ul className="menu-ul">
                        <li><img src={renameImage} /><span>Rename</span></li>
                        <li onClick={()=>props.deleteTask(props.task.id) && setOpenMenu(false)}>
                            <img src={deleteImage} />
                            <span>Delete</span>
                        </li>
                        <li className="move" onClick={()=>setOpenMove(!openMove)}>
                            <img src={moveImage} /> 
                            <span>Move to</span>
                            {openMove && 
                                <ul className="move-li">
                                    {props.task.taskState !== "todo" && <li onClick={()=>props.moveTask(props.task.id,"todo")}>To do</li>}
                                    {props.task.taskState !== "doing" &&<li onClick={()=>props.moveTask(props.task.id,"doing")}>Doing</li>}
                                    {props.task.taskState !== "done" &&<li onClick={()=>props.moveTask(props.task.id,"done")}>Done</li>}
                                </ul>
                            }
                        </li>
                    </ul>
                </div>
            }
            <textarea className={expand ? 'expand-desc' : 'desc'}  value={props.task.description} onChange={event=>props.task.description=event.target.value} disabled></textarea>
        </div>
    )
}