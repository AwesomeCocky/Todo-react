import Task from "./Task";
import { useEffect } from "react";
const Tasks = ({ tasks, onDelete}) => {
  
  useEffect(()=>{
    document.title = `Active Tasks: ${tasks.length}`
  }, [tasks.length])
  return (
    <>
      <h3>There is {tasks.length} {`${ tasks.length > 1 ? 'tasks' : 'task'}`} </h3>
      {tasks.sort((a,b)=>(a.day > b.day) ? 1 : -1).map((task,id) => (
        <Task
          key={id}
          task={task}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default Tasks;
