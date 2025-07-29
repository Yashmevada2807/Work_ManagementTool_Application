import React, { useState, useRef, useEffect } from 'react'
import { moveTodo, updateTodo } from '../features/todos/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { MdCancel, MdEdit, MdSave } from 'react-icons/md'
import { toast, Bounce } from 'react-toastify'


const InProgressCard = () => {

  const { inProgressTodos } = useSelector(state => state.todos)
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const dispatch = useDispatch()
  const editBoxRef = useRef(null)


  const handleDrop = (e) => {
    e.preventDefault()
    const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
    dispatch(moveTodo({ taskId, from, to: 'inprogress' }))
    const checkExistTodo = inProgressTodos.find((t => t.id === taskId))
    if (!checkExistTodo) {
      toast.success('Added to InProgress', {
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

  const handleEdit = (todoId, existTodo) => {

    if (existTodo.trim() === editText.trim()) {
      toast.info('No Changes Made'), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
      setEditId(null)
      setEditText('')
      return
    }
    if (editText.trim()) {
      dispatch(updateTodo({ todoId, updates: { todo: editText.trim() }, from: 'inprogress' }))
      toast.success('Edited Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    setEditId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editBoxRef.current && !editBoxRef.current.contains(event.target)) {
        // If clicked outside the edit box, cancel editing
        cancelEdit()
      }
    }

    if (editId !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editId])

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className='w-full bg-gradient-to-bl from-neutral-950 to-neutral-400  rounded-2xl overflow-hidden'
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
                className='bg-neutral-500 text-white flex items-center justify-between group hover:border border-gray-300 hover:scale-102 font-semibold px-3 py-3 rounded-xl my-2 transition-all duration-200'
              >
                <div className='w-full flex items-center justify-between pr-4 '>
                  {
                    editId === todo.id ? (
                      <div ref={editBoxRef} className="w-full flex gap-2">
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="bg-gray-700 text-white px-2 py-1 w-full rounded text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEdit(todo.id, todo.todo)}
                          className="text-white hover:text-white cursor-pointer"
                          title="Save"
                        >
                          <MdSave size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-400 hover:text-red-300 cursor-pointer"
                          title="Cancel"
                        >
                          <MdCancel size={18} color='white' />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm">{todo.todo}</span>
                        <button
                          onClick={() => {
                            setEditId(todo.id)
                            setEditText(todo.todo)
                          }}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          title="Edit"
                        >
                          <MdEdit size={18} />
                        </button>
                      </>
                    )
                  }
                </div>

              </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default InProgressCard
