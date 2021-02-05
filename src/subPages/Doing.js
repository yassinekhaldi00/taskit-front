import React from 'react';
import Task from '../components/Task';

export default function Doing(props) {
    
    return(
        
            <div className='tasks-container'>
                {
                     props.tasks.map(task=>{ 
                         if(task.taskState === "doing"){
                             if (props.filterTasks(task)!==null){
                                return <Task task={task} checkButton='check-enable' loadTasks={props.loadTasks} />
                             }
                         }
                     })
                }
            </div>
    
    )

}