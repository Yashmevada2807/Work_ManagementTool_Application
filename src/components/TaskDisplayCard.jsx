import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moveTodo, updateTodo } from '../features/todos/todoSlice'
import { MdCancel, MdEdit, MdSave } from 'react-icons/md'
import { toast, Bounce } from 'react-toastify'
import DropArea from './DropArea'

const TaskDisplayCard = () => {

    const dispatch = useDispatch()
    const { todosList } = useSelector(state => state.todos)
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')
    const editBoxRef = useRef(null)


    const handleDrop = (e) => {
        e.preventDefault()
        const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
        dispatch(moveTodo({ taskId, from, to: 'todo' }))
        const existTodo = todosList.find((t => t.id === taskId))

        if (!existTodo) {
            toast.success('Added to TodoList', {
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
            dispatch(updateTodo({ todoId, updates: { todo: editText.trim() }, from: 'todo' }))
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
            className='w-full bg-gradient-to-bl from-red-950 to-red-400  rounded-2xl overflow-hidden' >
            <header className='w-full p-3'>
                <h1 className='px-2 text-zinc-300 font-bold'>ToDo's List</h1>
            </header>
            <div className='p-2 w-full '>

                <ul className='w-full  px-4'>


                    {
                        todosList.map((todo) => {
                            return <li
                                draggable
                                onDragStart={(e) => {
                                    const dragData = JSON.stringify({ taskId: todo.id, from: 'todo' })
                                    e.dataTransfer.setData('application/json', dragData)
                                }}
                                key={todo.id}
                                className='bg-red-400 flex items-center justify-between shadow-2xl text-white group hover:border border-red-400 hover:scale-102 font-semibold px-3 py-3 rounded-xl my-2 transition-all duration-200'
                            >
                                <div className=' w-full flex items-center justify-between pr-4 '>
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
                                                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white cursor-pointer"
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

export default TaskDisplayCard
