import { createContext , useContext } from "react";

const TodoContext = createContext({
    todos:[{
        completed:false , 
        todoMsg:"Write msg here" , 
        id:1
    }]  
    ,

    addTodo: (todo) => {} ,  // todo here is a object
    updateTodo: (id , todo) => {} ,//id of todo to update ,  todo is the new updated todo object
    deleteTodo: (id) => {} ,  //id to todo to delete
    toggleComplete: (id) => {} //id of todo whose toggle was completed
})

export const TodoProvider = TodoContext.Provider ; 

export const  useTodo = () => {
    return useContext(TodoContext) 
}

