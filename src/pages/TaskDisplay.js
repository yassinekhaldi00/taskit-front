import React, { useEffect, useState } from 'react';
import '../style/taskDisplay.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import addImage from '../images/add.svg';
import Task from '../components/Task';
import Invitation from '../components/Invitation';

function TaskDisplay({user,DelUserFromLocalStorage, ...rest}){
    
    const [tasks, setTasks]=useState([]);
    const[invitations, setInvitations] = useState([])
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [todoPage, setTodoPage] = useState('todo');
    const [search, setSearch] = useState('');
    user = JSON.parse(user);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        loadTasks();
        loadInvitations();
      }, []);

      async function loadTasks(){
        tasks.length = 0
        await axios.get(`task/user/${user.id}`)
        .then(res =>{
            setTasks([...res.data.reverse()])
        }).catch(erreur=>{
            DelUserFromLocalStorage();
            console.log(erreur);
        })
    }

    async function loadInvitations(){
        await axios.get(`invitation/receiver/${user.id}`)
        .then(res =>{
            setInvitations([...res.data.reverse()])
        }).catch(erreur=>{
            DelUserFromLocalStorage();
            console.log(erreur);
        })
        console.log(invitations)
    }

    async function addTask(){
        const data = {
            title: newTaskTitle,
            description: newTaskDesc,
            taskState: todoPage,
            user: [{
                    id:user.id
            }]
        }
        await axios.post('task', data)
            .then(res=>{
                console.log("succes");
            }).catch(erreur=>{
                DelUserFromLocalStorage();
                console.log(erreur);
            })
        loadTasks()
        
    }

    function filterTasks(task){
        if (search !=='' && task.title !== null){
            if (task.title.toLowerCase().indexOf(search.toLowerCase()) !==-1){
                return task;
            }else{
                return null;
            }
        }else{
            return task;
        }
    }


    return(
        <div className='todo-container'>
            {
                invitations.map(invitation =>{
                    return <Invitation key={invitation.id} invitation ={invitation} loadInvitations={loadInvitations} loadTasks={loadTasks}/>
                })
            }
            <header className="header-bar">
                <ul className="setting-link">
                    <li className={todoPage==="todo"? "clicked-link":null} onClick={()=>setTodoPage("todo")}>To do</li>
                    <li className={todoPage==="doing"? "clicked-link":null} onClick={()=>setTodoPage("doing")}>Doing</li>
                    <li className={todoPage==="done"? "clicked-link":null} onClick={()=>setTodoPage("done")}>Done</li>
                </ul>
                <div className="search">
                    <input className="search-input" type='text' placeholder="Search" onChange={e=>setSearch(e.target.value)}/>
                    <i  className="fa fa-search"></i>
                </div>
            </header>

            <div className= "todo-container">

                <div className='add-task-field'>
                    <div className='input-task-field' >
                        <input placeholder="Enter your task"  onChange={e=>setNewTaskTitle(e.target.value)}/>
                        <textarea  placeholder = "Enter your description" onChange={e=>setNewTaskDesc(e.target.value)}/>
                    </div>
                    <img className="add-button"  src={addImage} alt='ad' onClick={addTask}/>
                </div>
                
                <div className='tasks-container'>
                    {
                        tasks.map(task=>{ 
                            if(task.taskState === todoPage){
                                if (filterTasks(task)!==null){
                                    return <Task key={task.id} task={task}  loadTasks={loadTasks} user={user}/>
                                }
                            }
                        })
                    }
                </div>
                

            </div>
           
            
        </div>
    )
}

export default withRouter(TaskDisplay);