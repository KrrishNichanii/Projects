import React, { useState } from 'react'
import { useTodo } from './Context';

function TodoItem({todo}) {
      const [text , setText] = useState(todo.todoMsg)
      const [isEditable , setIsEditable] = useState(false)
      const [completed , setCompleted] = useState(false) ;
       
      const {updateTodo , deleteTodo} = useTodo()

      const editTodo = () => {
        console.log("In edit")
        updateTodo(todo.id , {...todo,todoMsg:text})
        setIsEditable(false)
        
      }
      const handleCheck = () => {
             todo.completed = !todo.completed
             setCompleted((prev) => !prev) 
      }
    return(
      <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black 
      ${todo.completed ? "bg-[#c6e9a7]" :"bg-[#ccbed7]" }`}>
        <input
         type="checkbox"
         checked={todo.completed}
         onChange={handleCheck}
         className='cursor-pointer'
         />

         <input
          type="text"
          value={text}
          className={`border font-semibold rounded-lg bg-transparent w-full outline-none ${completed? "line-through": ""} ${ isEditable ? `border-black/10 px-2`:`border-transparent`}`}
          readOnly = {!isEditable}
          onChange={(e) => setText(e.target.value)}
          />

          <button 
          className='rounded-lg p-1.5 py-1 bg-slate-50 hover:bg-slate-200 '
          onClick={() => {
            if(completed) return  
             
            if(isEditable){
                console.log("in if edit");
                editTodo()
            }
            else setIsEditable((prev) => !prev)
          }}
          >
             {isEditable ? "📁" : "✏️"}
          </button>

          <button 
          className='rounded-lg p-1.5 py-1 bg-slate-50 hover:bg-slate-200 '
          onClick={() => deleteTodo(todo.id)}
          >
            ❌
          </button>
      </div>
    )
}

export default TodoItem