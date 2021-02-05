import React from 'react';
import Task from '../components/Task';

export default function Done(props) {
    
    return(
        
            <div className='tasks-container'>
                {
                     props.tasks.map(task=>{ 
                         if(task.taskState === "done"){
                             if (props.filterTasks(task)!==null){
                                return <Task task={task} checkButton='check-enable'  loadTasks={props.loadTasks} />
                             }
                         }
                     })
                }
            </div>
    
    )

}