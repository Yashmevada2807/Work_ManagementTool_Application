import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moveTodo } from '../features/todos/todoSlice'

const TaskDisplayCard = () => {

    const dispatch = useDispatch()
    const { todosList } = useSelector(state => state.todos)


    const handleDrop = (e) => {
        e.preventDefault()
        const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
        dispatch(moveTodo({ taskId, from, to: 'todo' }))
    }

    return (
        <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            className='w-full bg-red-700  rounded-2xl overflow-hidden' >
            <header className='w-full p-3'>
                <h1 className='px-2 text-zinc-300 font-bold'>ToDo's List</h1>
            </header>
            <div className='p-2 w-full '>
                
                <ul className='w-full  px-4'>
                    <div className='bg-red-500 text-gray-200 opacity-0 hover:opacity-100 hover:border border-red-400 hover:scale-102 font-semibold px-3 py-5 rounded-xl my-2'>
                                
                            </div>
                    {
                        todosList.map((todo) => {
                            return <li 
                            draggable
                            onDragStart={(e) => {
                                const dragData = JSON.stringify({taskId: todo.id, from: 'todo' })
                                e.dataTransfer.setData('application/json', dragData)
                            }}
                            key={todo.id} 
                            className='bg-red-500 text-gray-200 hover:border border-red-400 hover:scale-102 font-semibold px-3 py-3 rounded-xl my-2'
                            >
                                {todo.todo}
                                
                            </li>
                            
                        })
                        
                    }
                    <div className='bg-red-500 text-gray-200 opacity-0 hover:opacity-100 hover:border border-red-400 hover:scale-102 font-semibold px-3 py-3 rounded-xl my-2'>
                                
                            </div>
                </ul>
            </div>
        </div>
    )
}

export default TaskDisplayCard
