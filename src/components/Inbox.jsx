import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, updateTodo } from '../features/todos/todoSlice'
import { MdDelete, MdSave, MdEdit, MdClose } from 'react-icons/md'
import DeleteConfirmModal from './Modal'
import { toast, Bounce } from 'react-toastify'


const Inbox = () => {
    const [displayInputField, setDisplayInputField] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')
    const [inputText, setInputText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)

    const { inbox } = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const editBoxRef = useRef(null)


    const addtoTask = () => {
        if (!inputText.trim()) return setDisplayInputField(false)

        const todo = {
            id: Date.now(),
            todo: inputText.trim(),
            isComplete: false,
            columnId: 'todo'
        }

        dispatch(addTodo(todo))
        setInputText('')
        setDisplayInputField(false)
    }

    const handleDeleteClick = (todo) => {
        setSelectedTodo(todo)
        setShowModal(true)
    }

    const cancelAddingTask = () => {
        setInputText('')
        setDisplayInputField(false)
    }

    const confirmDelete = () => {
        dispatch(removeTodo({ todoId: selectedTodo.id, from: 'inbox' }))
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

    const saveUpdate = (todoId, existTodo) => {
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
            setEditId(null);
            setEditText('');
            return
        }
        if (editText.trim()) {
            dispatch(updateTodo({ todoId, updates: { todo: editText.trim() }, from: 'inbox' }))
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
        <div className='w-full min-w-[200px] max-w-[700px] h-screen bg-gradient-to-tl from-blue-950 via-blue-400 to-blue-950 overflow-hidden'>
            <header className='bg-blue-950 border-b border-blue-500 px-1 py-2'>
                <h1 className='text-gray-300 text-xl font-semibold w-fit px-3 py-1'>INBOX</h1>
            </header>

            <div className='px-4 py-5 w-full'>
                {!displayInputField && (
                    <button
                        onClick={() => setDisplayInputField(true)}
                        className='w-full p-2 rounded-md text-gray-900 bg-blue-300 flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-gray-300 transition-all duration-200'
                    >
                        Add a card
                    </button>
                )}

                {displayInputField && (
                    <div>
                        <input
                            type="text"
                            className='w-full p-2 text-gray-900 rounded-md placeholder:text-gray-900 bg-blue-300'
                            placeholder='Enter Your Todo...'
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            autoFocus
                        />
                        <div className='flex gap-2 px-2 pt-3'>
                            <button
                                onClick={addtoTask}
                                className='px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all duration-200 cursor-pointer'
                            >
                                Add
                            </button>
                            <button
                                onClick={cancelAddingTask}
                                className='px-3 py-1 text-white font-semibold cursor-pointer'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <ul className='w-full px-4 mt-8 space-y-3 '>
                    {inbox.map((todo) => (
                        <li
                            ref={editBoxRef}
                            key={todo.id}
                            draggable
                            onDragStart={(e) => {
                                const dragData = JSON.stringify({ taskId: todo.id, from: 'inbox' })
                                e.dataTransfer.setData('application/json', dragData)
                            }}
                            className="flex items-center justify-between bg-blue-700 hover:border border-blue-300 hover:scale-105 text-gray-200 px-4 py-3 rounded-lg group shadow-md transition-all duration-300 hover:bg-blue-500"
                        >
                            <div className="w-full flex items-center justify-between pr-4">
                                {editId === todo.id ? (
                                    <div ref={editBoxRef} className="flex items-center gap-2 w-full">
                                        <input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="bg-gray-700 text-white px-2 py-1 w-full rounded text-sm"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => saveUpdate(todo.id, todo.todo)}
                                            className="text-green-400 hover:text-green-300 cursor-pointer"
                                            title="Save"
                                        >
                                            <MdSave size={18} />
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="text-red-400 hover:text-red-300 cursor-pointer"
                                            title="Cancel"
                                        >
                                            <MdClose size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-1 pr-4">
                                            <span className="text-sm">{todo.todo}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditId(todo.id);
                                                    setEditText(todo.todo);
                                                }}
                                                className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-yellow-300 cursor-pointer"
                                                title="Edit"
                                            >
                                                <MdEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(todo)}
                                                className="text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300  text-white hover:bg-blue-600 cursor-pointer"
                                            >
                                                <MdDelete size={18} color="red" />
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>
                        </li>
                    ))}
                </ul>
                {showModal && (
                    <DeleteConfirmModal onConfirm={confirmDelete} onCancel={cancelDelete} />
                )}
            </div>
        </div>
    )
}

export default Inbox
