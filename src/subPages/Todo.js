import React from 'react';
import Task from '../components/Task';

export default function Todo(props) {
    
    return(
        
            <div className='tasks-container'>
                {
                     props.tasks.map(task=>{ 
                         if(task.taskState === "todo"){
                             if (props.filterTasks(task)!==null){
                                 return <Task task={task} checkButton='check-enable'  loadTasks={props.loadTasks} />
                             }
                         }
                     })
                }
            </div>
    
    )

}