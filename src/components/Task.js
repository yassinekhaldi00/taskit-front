import React, { useState } from 'react';
import check from '../images/check.png';
import expandImage from '../images/expand.svg';
import Delete from '../images/delete.png';
import menuImage from '../images/menu.png';
import renameImage from '../images/rename.svg';
import deleteImage from '../images/delete.svg';
import moveImage from '../images/move.svg';

export default function Task(props){

    const [expand, setExpand] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMove, setOpenMove] = useState(false);
    const [openRename, setOpenRename] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

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
                        <li classnName= "rename" >
                            <div className="img-span" onClick={()=>setOpenRename(!openRename)}>
                                <img src={renameImage} />
                                <span>Rename</span>
                            </div>
                            {openRename && 
                                <form className="rename-form" onSubmit={(event)=>props.renameTask(props.task.id, title, description) && event.preventDefault()}>
                                    <input placeholder="Enter title" type="text" onChange={e=>setTitle(e.target.value)}/>
                                    <textarea placeholder="Enter description" onChange={e=>setDescription(e.target.value)}/>
                                    <input type="submit" value="Rename"></input>
                                </form>
                            }
                        </li>

                        <li onClick={()=>props.deleteTask(props.task.id) && setOpenMenu(false)}>
                            <div className="img-span">
                                <img src={deleteImage} />
                                <span>Delete</span>
                            </div>
                        </li>

                        <li className="move" onClick={()=>setOpenMove(!openMove)}>
                            <div className="img-span">
                                <img src={moveImage} /> 
                                <span>Move to</span>
                            </div>
                            {openMove && 
                                <ul className="move-li">
                                    {props.task.taskState !== "todo" && <li onClick={()=>props.moveTask(props.task.id,"todo")}><span>To do</span></li>}
                                    {props.task.taskState !== "doing" &&<li onClick={()=>props.moveTask(props.task.id,"doing")}><span>Doing</span></li>}
                                    {props.task.taskState !== "done" &&<li onClick={()=>props.moveTask(props.task.id,"done")}><span>Done</span></li>}
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