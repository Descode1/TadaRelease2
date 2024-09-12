import React, { useEffect, useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Sidebar from './components/Sidebar'


function App() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const handleAddTodo = ()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }

    let updatedTodoArr =[ ...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if(savedTodo){
      setTodos(savedTodo);
    }
  },[]);
  const handleDel = (index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
   
    localStorage.setItem("todolist",JSON.stringify(reducedTodo));
     setTodos(reducedTodo);
  
  };
  const handleCompl = (index) =>{
    let now = new Date();
    let dd= now.getDay();
    let mm= now.getMonth();
    let yyyy= now.getFullYear();
    let h= now.getHours();
    let m= now.getMinutes();
    let s= now.getSeconds();
    let completedOn= dd+"-"+mm+"-"+ yyyy +" "+ 'at'+' ' +h +":"+m+":"+s
    
    let filteredItem ={
      ...allTodos[index],
      completedOn:completedOn
    }  
    let updatedCompletedArr =[...completedTodos]
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr)
    handleDel(index)
  }
  return (
  <div className='App'>
  
  <h1> TADAA</h1>
<div className='todo-wrapper'>
  <div className='todo-input'>
  <div className='todo-input-item'>
    <label>Title</label>
    <input type='text' value={newTitle} onChange={(e)=>setNewTitle (e.target.value)} placeholder="What's the task title"/>

  </div>
  <div className='todo-input-item'>
    <label>Description</label>
    <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?"/>

  </div>
  <div className='todo-input-item'>
    <button type='button' on onClick={handleAddTodo} className='primaryBtn'>Add</button>
  </div>
  </div>
  <div className='btn-area'>
    <button className={`secondarybtn ${isCompleteScreen===false && "active"}`} onClick={()=>setIsCompleteScreen(false)}>TODO</button>
    <button className={`secondarybtn ${isCompleteScreen===true  && "active"}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
  </div>
  <div className='todo-list'>
    {isCompleteScreen===false && allTodos.map((item,index)=>{
      return(
        <div className='todo-list-item' key={index}>
      <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
    <div >
      < MdDelete className='Del-icon' onClick={()=>handleDel(index)} title='delete?' />
      <FaCheck className='check-icon' onClick={()=>handleCompl(index)} title='complete?'/>

    </div>
  </div>
      )
    }
  )}
  {isCompleteScreen===true && completedTodos.map((item,index)=>{
      return(
        <div className='todo-list-item' key={index}>
      <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p><i>completed On: {item.completedOn}</i></p>
    </div>
    <div >
      < MdDelete className='Del-icon' onClick={()=>handleDel(index)} title='delete?' />
     

    </div>
  </div>
      )
    }
  )}
  </div>
  </div>
  </div>
  )


}
export default App
