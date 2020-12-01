import React, { useEffect, useState } from 'react';
import '../style/taskDisplay.css';
import Task from '../components/Task';
import plus from '../images/plus.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function TaskDisplay({user,DelUserFromLocalStorage, ...rest}){
    
    const [tasks, setTasks]=useState([]);
    const [todoPage, setTodoPage] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState();
    const [newTaskDesc, setNewTaskDesc] = useState();
    const [search, setSearch] = useState('');
    user = JSON.parse(user);

    async function loadTasks(){
        await axios.get('task/user/'+user.id)
        .then(res =>{
            res.data.map(task=>{
                tasks.push({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    checked: task.done,
                });
            })
        }).catch(erreur=>{
            DelUserFromLocalStorage();
            console.log(erreur);
        })
        setTasks([...tasks]);
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        loadTasks();
      }, []);

    async function addTask(){
        const data = {
            title: newTaskTitle,
            description: newTaskDesc,
            done: false,
            user: {
                id:user.id
            }
        }
        await axios.post('task', data)
            .then(res=>{
                tasks.push({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    checked: res.data.done,
                });
            }).catch(erreur=>{
                DelUserFromLocalStorage();
                console.log(erreur);
            })
        
        setTasks([...tasks]);
        console.log(tasks)
    }

    async function deleteTask(id){
        await axios.delete('task/'+id)
            .then(res=>{
                for (let i=0;i<tasks.length;i++){
                    if(tasks[i].id===id){
                        tasks.splice(i,1);
                    }
                }
            }).catch(erreur=>{
                DelUserFromLocalStorage();
                console.log(erreur);
            })
        setTasks([...tasks]);
    }

    async function checkTask(id){
        let data ={};
        for (let i=0;i<tasks.length;i++){
            if(tasks[i].id===id){
                tasks[i].checked = true;
                data = {
                    id:id,
                    title: tasks[i].title,
                    description: tasks[i].description,
                    done: tasks[i].checked,
                    user: {
                        id:user.id
                    }
                }
                console.log(tasks[i]);
            }
        }
        await axios.put('task', data)
            .then(res=>{
                console.log(res);
                setTasks([...tasks]);
            })
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
                    <li className={todoPage ? "clicked-link" : null} onClick={()=>setTodoPage(true)}>To do</li>
                    <li className={todoPage ? null :"clicked-link"} onClick={()=>setTodoPage(false)}>Done</li>
                </ul>
                <div className="search">
                    <input type='text' placeholder="Search" onChange={e=>setSearch(e.target.value)}/>
                    <i className="fa fa-search"></i>
                </div>
            </header>
            
            {todoPage && 
            <div className='add-task-field'>
                <div className='input-task-field' >
                    <input placeholder="Enter your task"  onChange={e=>setNewTaskTitle(e.target.value)}/>
                    <textarea  placeholder = "Enter your description" onChange={e=>setNewTaskDesc(e.target.value)}/>
                </div>
                <img className="add-button"  src={plus} alt='ad' onClick={addTask}/>
            </div>}
            
            <div className='tasks-container'>
                {
                     tasks.map(task=>{ 
                         if(!task.checked && todoPage){
                             if (filterTasks(task)!==null){
                                 return <Task task={task} deleteTask={deleteTask} checkButton='check-enable' checkTask={checkTask}/>
                             }
                         }
                         if(task.checked && !todoPage){
                            if (filterTasks(task)!==null){
                                return <Task task={task} deleteTask={deleteTask} checkButton='check-enable' checkTask={checkTask}/>
                            }
                         }
                     })
                }
            </div>
           
            
        </div>
    )
}

export default withRouter(TaskDisplay);