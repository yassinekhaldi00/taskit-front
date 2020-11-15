import React, { useState } from 'react';
import './taskDisplay.css';
import Task from '../components/Task';
import plus from '../images/plus.png';

export default function TaskDisplay(){
    const [tasks, setTasks]=useState([]);
    const [todoPage, setTodoPage] = useState(true);

    function addTask(){
        const id = tasks.length===0 ? 0 : tasks[tasks.length-1].id+1;
        setTasks([...tasks,{
            id:id,
            checked:false,
        }]);
        console.log(tasks)
    }

    function deleteTask(id){
        for (let i=0;i<tasks.length;i++){
            if(tasks[i].id===id){
                console.log(tasks[i]);
                tasks.splice(i,1);
            }
        }
        setTasks([...tasks]);
    }

    function checkTask(id){
        for (let i=0;i<tasks.length;i++){
            if(tasks[i].id===id){
                tasks[i].checked = true;
                console.log(tasks[i]);
            }
        }
        setTasks([...tasks]);
    }

    return(
        <div className='todo-container'>
            <div className ='button-container'>
                <button className={todoPage ? "enable-todo-button" :'disable-todo-button'} onClick={()=>setTodoPage(true)}>To do</button>
                <button className={todoPage ? 'disable-done-button' :"enable-done-button"} onClick={()=>setTodoPage(false)}>Done</button>
            </div>
            <img className={todoPage ? "add-button" :'remove-add-button'} src={plus} alt='ad' onClick={addTask}/>
            <div className='tasks-container'>
                {
                     tasks.map(task=>{ 
                         if(!task.checked && todoPage){
                            return <Task task={task} deleteTask={deleteTask} checkButton='check-enable' checkTask={checkTask}/>
                         }
                         if(task.checked && !todoPage){
                            return <Task task={task} deleteTask={deleteTask} checkButton='check-disable'/>
                         }
                     })
                }
            </div>
           
            
        </div>
    )
}