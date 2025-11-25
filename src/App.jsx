import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import TodoForms from './component/TodoForms'
import TodoItem from './component/TodoItem'


function App() {
  const [todos, settodos] = useState([])

  const addTodo = (todo) => {
    settodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updatetodo = (id, todo) => {
    settodos((prev) => prev.map((prevTodo) => 
      (prevTodo.id === id) ? todo : prevTodo
    ))
  }

  const deletetodo = (id) => {
    settodos((prev) => prev.filter((prevTodo) => 
      prevTodo.id !== id
    ))
  }

  const toggleCompleted = (id) => {
    settodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id 
        ? {...prevTodo, completed: !prevTodo.completed} 
        : prevTodo
    ))
  }

  useEffect(() => {
    const todo = JSON.parse(localStorage.getItem("todos"))

    if(todo && todo.length > 0) {
      settodos(todo)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, deletetodo, updatetodo, toggleCompleted}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForms/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App