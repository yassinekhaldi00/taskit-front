import React, { useEffect, useState } from 'react';
import '../style/taskDisplay.css';
import Task from '../components/Task';
import plus from '../images/plus.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function TaskDisplay({user, ...rest}){
    
    const [tasks, setTasks]=useState([]);
    const [todoPage, setTodoPage] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState();
    const [newTaskDesc, setNewTaskDesc] = useState();
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
                console.log(res.data);
                tasks.push({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    checked: res.data.done,
                });
            }).catch(erreur=>{
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
                        console.log(tasks[i]);
                        tasks.splice(i,1);
                    }
                }
            }).catch(erreur=>{
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

    return(
        <div className='todo-container'>
            <div className ='button-container'>
                <button className={todoPage ? "enable-todo-button" :'disable-todo-button'} onClick={()=>setTodoPage(true)}>To do</button>
                <button className={todoPage ? 'disable-done-button' :"enable-done-button"} onClick={()=>setTodoPage(false)}>Done</button>
            </div>
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
                            return <Task task={task} deleteTask={deleteTask} checkButton='check-enable' checkTask={checkTask}/>
                         }
                         if(task.checked && !todoPage){
                            return <Task task={task} deleteTask={deleteTask} checkButton='check-disable' />
                         }
                     })
                }
            </div>
           
            
        </div>
    )
}

export default withRouter(TaskDisplay);