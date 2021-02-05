import React, { useState } from 'react';
import expandImage from '../images/expand.svg';
import menuImage from '../images/menu.png';
import renameImage from '../images/rename.svg';
import deleteImage from '../images/delete.svg';
import moveImage from '../images/move.svg';
import shareImage from '../images/share.svg';
import axios from 'axios';
import Avatar from 'react-avatar';

export default function Task(props){

    const [expand, setExpand] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMove, setOpenMove] = useState(false);
    const [openRename, setOpenRename] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [openShare, setOpenShare] = useState(false);
    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState(true);

    async function renameTask(title, description){
        props.task.title = title;
        props.task.description = description
        await axios.put('task', props.task)
            .then(res=>{
                console.log(res);
            })
        props.loadTasks()
    }
    
    async function deleteTask(){
        await axios.delete('task/'+props.task.id)
            .then(res=>{
                console.log(res);
            }).catch(erreur=>{
                console.log(erreur);
            })
            props.loadTasks()
    }

    
    async function moveTask(state){
        props.task.taskState = state;
        await axios.put('task', props.task)
            .then(res=>{
                console.log(res);
            })
        props.loadTasks()
    }

    async function shareTask(email){
        let data = props.task;
        await axios.put('task/share/'+email, data)
            .then(res=>{
                setValidEmail(res.data);
            })
            props.loadTasks()
    }


    return(
        <div className='task-container'>
            <div className='task-box' id = {props.task.id}>
                <div className='task'>
                    <input type='text' value={props.task.title} onChange={event=>props.task.title=event.target.value} disabled/>
                    <div className='img-container'>
                        <img className={expand ? 'up': 'down'} src={expandImage} alt='expand' onClick={()=>setExpand(!expand)}/>
                        <img className='check-enable'  src={menuImage} alt='menu' onClick={()=>setOpenMenu(!openMenu)}/>
                    </div>
                </div>
                
                <div className="task-users">
                    {
                        props.task.user.map(user=>{
                            if(user.id !== props.user.id){
                                let name = props.user.firstName +" "+props.user.lastName
                                return <Avatar className ="avatar" name={name} size="28" round={true} color={Avatar.getRandomColor('sitebase', ['rgb(255, 214, 214)','#F39595'])}  fgColor="black" textSizeRatio={2.3} />
                            }
                        })
                    }
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
                                <form className="rename-form" onSubmit={(event)=>renameTask(title, description) && event.preventDefault()}>
                                    <input placeholder="Enter title" type="text" onChange={e=>setTitle(e.target.value)}/>
                                    <textarea placeholder="Enter description" onChange={e=>setDescription(e.target.value)}/>
                                    <input type="submit" value="Rename"></input>
                                </form>
                            }
                        </li>

                        <li onClick={()=>deleteTask() && setOpenMenu(false)}>
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
                                    {props.task.taskState !== "todo" && <li onClick={()=>moveTask("todo")}><span>To do</span></li>}
                                    {props.task.taskState !== "doing" &&<li onClick={()=>moveTask("doing")}><span>Doing</span></li>}
                                    {props.task.taskState !== "done" &&<li onClick={()=>moveTask("done")}><span>Done</span></li>}
                                </ul>
                            }
                        </li>

                        <li classnName= "share" >
                            <div className="img-span" onClick={()=> setOpenShare(!openShare)}>
                                <img src={shareImage} />
                                <span>Share with</span>
                            </div>
                            {openShare && 
                                <div className="share-form">
                                    <input placeholder="Enter email" type="email" onChange={e=>setEmail(e.target.value)}/>
                                    {validEmail ? null : <p>There is no user with this email</p> }
                                    <input type="submit" value="Send" onClick={()=>shareTask(email)}></input>
                                </div>
                            }
                        </li>

                    </ul>
                </div>
            }
            <textarea className={expand ? 'expand-desc' : 'desc'}  value={props.task.description} onChange={event=>props.task.description=event.target.value} disabled></textarea>
        </div>
    )
}