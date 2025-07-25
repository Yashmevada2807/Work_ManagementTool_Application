import React from 'react'
import { moveTodo, removeTodo } from '../features/todos/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'

const TaskOverCard = () => {

  const dispatch = useDispatch()
  const { completedTodos } = useSelector(state => state.todos)

  const handleDrop = (e) => {
    e.preventDefault()
    const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
    dispatch(moveTodo({ taskId, from, to: 'completed' }))
  }

  const deleteTodo = (todoId) => {
    dispatch(removeTodo({todoId, from: 'completed'}))
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className='w-full bg-green-700 rounded-2xl overflow-hidden' >
      <header className='w-full p-3'>
        <h1 className='px-2 text-zinc-300 font-bold'>Completed Task </h1>
      </header>
      <div className='p-2 w-full '>
        <ul className='w-full  px-4'>

          {
            completedTodos.map((todo) => {
              return <li
                key={todo.id}
                draggable
                onDragStart={(e) => {
                  const dragData = JSON.stringify({ taskId: todo.id, from: 'completed' })
                  e.dataTransfer.setData('application/json', dragData)
                }}
                className='bg-green-600 group relative text-gray-200 font-semibold px-3 py-3 hover:border border-green-500 hover:scale-102 rounded-xl my-2'
              >
                {todo.todo}
                <button onClick={() => deleteTodo(todo.id)} className='absolute bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 right-2 rounded-full bg-green-600 px-2.5  py-2.5'>
                  <MdDelete />
                </button>
              </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default TaskOverCard
