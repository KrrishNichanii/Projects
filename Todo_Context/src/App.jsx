import {  useState , useEffect } from "react"
import TodoForm from "./components/TodoForm"
import { TodoProvider } from "./components/Context"
import TodoItem from "./components/TodoItem"


function App() {
    const [todos , setTodos] =useState([])
    const [store , setStore] = useState([])
    const addTodo = (todo) => {
      setTodos((prev) => [todo,...prev])
      setStore([])
    }

    const deleteTodo = (id) => {
             setTodos((prev) => prev.filter((ele) =>{
                 const f = ele.id !== id ; 
                 if(!f) setStore((prev) => [ele,...prev]) 
                 console.log(store);
                 return f 
             }  ))
    }
   
    const updateTodo = (id , todo) => {
        setTodos((prev) => prev.map((prevTodo) =>
        (prevTodo.id === id ? todo: prevTodo )
        ))
    }

    const toggleComplete = (id) => {
             setTodos((prev) => prev.map((ele ,idx) => {
                      if(ele.id === id){
                        prev[idx].completed = !prev[idx].completed
                      }
             } ))
    }

useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("Todos"))

  if(todos && todos.length > 0){
             setTodos(todos)
  }
} , [])

useEffect(() => {
  localStorage.setItem("Todos" ,JSON.stringify(todos))
}, [todos])

   const handleUndo = () => {
       setTodos((prev) => [...prev,...store])
       setStore([])
   }

  return (
    <TodoProvider value={{addTodo ,  todos , deleteTodo , updateTodo , toggleComplete ,  store}}>
       <div className="bg-[#172842] h-[100vh] p-8">
        <button 
        className="absolute top-40 left-40  bg-gray-100 p-2 py-1 rounded-lg hover:bg-slate-200"
        onClick={handleUndo}
        >Undo</button>
            <div className="w-full max-w-2xl mx-auto mt-5 shadow-md p-3 rounded-lg">
              <h1 className="text-center text-white font-bold text-2xl mb-5">Manage Your Todos</h1>
              <TodoForm/>
              <div className="w-full mt-3 flex flex-col gap-3">

                 {
                  todos?.map((todo) =>(
                     
                        <div key={todo.id} className='w-full'>
                           <TodoItem todo={todo} />
                        </div>
                      ))
                 }
                   
              </div>
            </div>
       </div>
    </TodoProvider>
   )
}

export default App
