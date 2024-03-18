import React, { useState } from 'react' 
import { useTodo } from './Context'


function TodoForm() {
    const [todo ,setTodo] = useState("")
    const {addTodo, todos } = useTodo()

 

    const add = (e) => {
        e.preventDefault();
       
        if(!todo) return 

        addTodo({id:Date.now() , todoMsg:todo , completed:false}) ; 
        
        setTodo("")
    }
   
    return (
        <form className="flex mb-5" onSubmit={add}>
            <input 
            type="text"
            placeholder='Write Todo...'
            className='bg-white/20 p-2 rounded-l-lg px-4 w-full outline-none text-white' 
            value={todo }
            onChange={(e) => setTodo(e.target.value)}
            />

            <button
                type="submit"
                className="text-white bg-green-600 rounded-r-lg p-2 px-3 hover:bg-green-700"
            >
                Add
            </button>
            
        </form>
    )
}

export default TodoForm 