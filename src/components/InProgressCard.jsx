import React, { useState } from 'react'
import { moveTodo } from '../features/todos/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
const InProgressCard = () => {

  const { inProgressTodos } = useSelector(state => state.todos)
  const dispatch = useDispatch()


  const handleDrop = (e) => {
    e.preventDefault()
    const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
    dispatch(moveTodo({ taskId, from, to: 'inprogress' }))
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className='w-full bg-neutral-700  rounded-2xl overflow-hidden'
    >
      <header className='w-full p-3'>
        <h1 className='px-2 text-zinc-300 font-bold'>InProgress Task </h1>
      </header>
      <div className='p-2 w-full '>
        <ul className='w-full  px-4'>
          {
            inProgressTodos.map((todo) => {
             return <li
                key={todo.id}
                draggable
                onDragStart={(e) => {
                  const dragData = JSON.stringify({ taskId: todo.id, from: 'inprogress' })
                  e.dataTransfer.setData('application/json', dragData)
                }}
                className='bg-neutral-600 text-gray-200 hover:border border-gray-300 hover:scale-102 font-semibold px-3 py-3 rounded-xl my-2'
              >
                {todo.todo}
              </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default InProgressCard
