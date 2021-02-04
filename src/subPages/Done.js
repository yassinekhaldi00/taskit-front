import React from 'react';
import Task from '../components/Task';

export default function Done(props) {
    
    return(
        
            <div className='tasks-container'>
                {
                     props.tasks.map(task=>{ 
                         if(task.taskState === "done"){
                             if (props.filterTasks(task)!==null){
                                 return <Task task={task} deleteTask={props.deleteTask} checkButton='check-enable' moveTask={props.moveTask} renameTask={props.renameTask}/>
                             }
                         }
                     })
                }
            </div>
    
    )

}