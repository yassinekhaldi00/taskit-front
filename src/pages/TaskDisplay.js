import React, { useEffect, useState } from 'react';
import '../style/taskDisplay.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import addImage from '../images/add.svg';
import Task from '../components/Task';

function TaskDisplay({user,DelUserFromLocalStorage, ...rest}){
    
    const [tasks, setTasks]=useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState();
    const [newTaskDesc, setNewTaskDesc] = useState();
    const [todoPage, setTodoPage] = useState('todo');
    const [search, setSearch] = useState('');
    user = JSON.parse(user);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        loadTasks();
      }, []);

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

    async function loadTasks(){
        tasks.length = 0
        await axios.get('task/user/'+user.id)
        .then(res =>{
            res.data.map(task=>{
                tasks.push({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    taskState: task.taskState,
                    user: task.user
                });
            })
        }).catch(erreur=>{
            DelUserFromLocalStorage();
            console.log(erreur);
        })
        setTasks([...tasks]);
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
            <header className="header-bar">
                <ul className="setting-link">
                    <li className={todoPage==="todo"? "clicked-link":null} onClick={()=>setTodoPage("todo")}>To do</li>
                    <li className={todoPage==="doing"? "clicked-link":null} onClick={()=>setTodoPage("doing")}>Doing</li>
                    <li className={todoPage==="done"? "clicked-link":null} onClick={()=>setTodoPage("done")}>Done</li>
                </ul>
                <div className="search">
                    <input type='text' placeholder="Search" onChange={e=>setSearch(e.target.value)}/>
                    <i className="fa fa-search"></i>
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
                                    return <Task task={task}  loadTasks={loadTasks} user={user}/>
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