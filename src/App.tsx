import { useState, useEffect } from 'react'
import './App.css'
import { Plus } from 'react-feather';
import styles from './styles/pages/home.module.css';
import { Task } from './componentes/Task/index.tsx';
import { CreateTaskModal } from "./componentes/CreateTaskModal/index.tsx";
import Modal from "react-modal";
import { ITaskProps } from './componentes/Task/types.ts';


Modal.setAppElement("#root");

function App() {
  const [tasks, setTasks] = useState <ITaskProps []>( () => {
    const taskfromLocalStorage = localStorage.getItem("tasks");
    if (!taskfromLocalStorage){
      return [ ]
    }
    return JSON.parse(taskfromLocalStorage);
  });
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  function handleToggleTask(clickedTask: ITaskProps) {
    setTasks( (prevState) => { 
      return prevState.map((task) => {
        if (task.id === clickedTask.id){
          return {
            ...task,
            isCompleted : !task.isCompleted
          }
        }
        return task;
      }
    )}
  )}

  function handleRemoveTask(taskId: number){
    setTasks((prevState)=>{
      return prevState.filter((task) => {
        return task.id !== taskId;
      })
    })
  }

  function handleRequestCloseCreateTaskModal() {
    return (
      setIsCreateTaskModalOpen(false)
    )
  }

  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks] )

  return (
    <div className='App'>
      <section className={styles.container}>
        <header className= {styles.header}>
          <h1>Minhas Tarefas</h1>
          <button type='button' className={styles.addTaskButton} onClick={ () => setIsCreateTaskModalOpen(true) }>
            Adicionar <Plus />
          </button>
        </header>

        <div className= {styles.tasks}>
          {tasks?.map((task) => (<Task key={task.id} task= {task} handleToggleTask={handleToggleTask} handleRemoveTask={handleRemoveTask}/>))}
        </div>
      </section>

      <CreateTaskModal isOpen={isCreateTaskModalOpen} onRequestClose = {handleRequestCloseCreateTaskModal} tasks={tasks} setTasks ={setTasks}/>


    </div>
  )
}

export default App