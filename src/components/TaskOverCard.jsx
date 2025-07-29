import React, { useState } from 'react'
import { moveTodo, removeTodo } from '../features/todos/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import DeleteConfirmModal from './Modal'
import { toast, Bounce } from 'react-toastify'

const TaskOverCard = () => {

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const { completedTodos } = useSelector(state => state.todos)

  const handleDrop = (e) => {
    e.preventDefault()
    const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
    dispatch(moveTodo({ taskId, from, to: 'completed' }))
    const checkExistTodo = completedTodos.find(t => t.id === taskId)

    if (!checkExistTodo) {
      toast.success('Added to CompletedTask', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  const handleDelete = (todo) => {
    setSelectedTodo(todo)
    setShowModal(true)

  }

  const confirmDelete = () => {
    dispatch(removeTodo({ todoId: selectedTodo.id, from: 'completed' }))
    toast.success('Deleted SuccessFully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setShowModal(false)
    setSelectedTodo(null)
  }

  const cancelDelete = () => {
    setShowModal(false)
    setSelectedTodo(null)
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className='w-full bg-gradient-to-bl from-green-950 to-green-400 rounded-2xl overflow-hidden' >
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
                className=' bg-green-500 group relative text-blue-100 font-semibold px-3 py-3 hover:border border-green-300 hover:scale-102 rounded-xl my-2 transition-all duration-200 '
              >
                {todo.todo}
                <button onClick={() => handleDelete(todo)} className='absolute bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 right-2 rounded-full cursor-pointer px-2.5  py-2.5 '>
                  <MdDelete size={18} />
                </button>
              </li>
            })
          }
          {showModal && <DeleteConfirmModal onConfirm={confirmDelete} onCancel={cancelDelete} />}
        </ul>
      </div>
    </div>
  )
}

export default TaskOverCard
