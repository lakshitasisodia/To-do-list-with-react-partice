import { createContext, useContext } from "react";


export const TodoContext = createContext({
    todo : [
        {
            id:1,
            todo: "Todo msg",
            completed : false
        }

    ],
    addtodo : (todo)=>{},
    deletetodo : (id)=>{},
    updatetodo : (id,todo)=>{},
    toggleComplete : (id)=>{}
})

export const useTodo = () =>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider