import { useEffect, useRef, useState } from 'react'
import './Home.css'
import axios from 'axios'

export default function Home(){
  const [todos, setTodos] = useState([]) 
  const [task, setTask] = useState("")

  const inputRef = useRef()

  useEffect(() => {
    async function getData(){
      inputRef.current.focus()
      // const result = await axios.get('http://localhost:3001/get')
      const result = await axios.get('https://todo-devpia.koyeb.app/get')
      setTodos(result.data)
    }
    getData()
  },[])

  const handleAdd = async()=> {
    await axios.post('https://todo-devpia.koyeb.app/add',{task:task})
    const result = await axios.get('https://todo-devpia.koyeb.app/get')
    setTodos(result.data)
    inputRef.current.value=""
    inputRef.current.focus()
  }
  const handleEdit = async(id)=> {
   await axios.put('https://todo-devpia.koyeb.app/update/'+id)
   const result = await axios.get('https://todo-devpia.koyeb.app/get')
   setTodos(result.data)
  }
  const handleDelete = async(id)=> {
    await axios.delete('https://todo-devpia.koyeb.app/delete/'+id)
    const result = await axios.get('https://todo-devpia.koyeb.app/get')
    setTodos(result.data)
  }

  return(
    <div className='home'>
      <h2>Todo List</h2>
      <div className='create_form'>
        <input type="text" placeholder='Enter task' 
              ref={inputRef} 
              onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={handleAdd}>Add</button>
      </div>
      {
        todos.length === 0
        ?
        <div><h2>No Record</h2></div>
        :
        todos.map(todo => 
          <div className='task' key={todo._id}>
            <input type="checkbox" 
              onChange={()=> handleEdit(todo._id)} 
              checked={todo.done ? "checked" : ""}/>
            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            <div>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </div>
        )
      }
    </div>
  )
}