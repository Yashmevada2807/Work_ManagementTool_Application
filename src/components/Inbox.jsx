import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, moveTodo, removeTodo, updateTodo } from '../features/todos/todoSlice'
import { MdDelete } from 'react-icons/md'
const Inbox = () => {

    const [displayInputField, setDisplayInputField] = useState(false)
    const [disable, setDisable] = useState(true)
    const [inputText, setInputText] = useState('')

    const { inbox } = useSelector(state => state.todos)
    const dispatch = useDispatch()


    const displayINPUTFIELD = () => setDisplayInputField(true)


    const cancelINPUTFIELD = () => setDisplayInputField(false)

    const addtoTask = () => {

        const todo = {
            id: Date.now(),
            todo: inputText,
            isComplete: false,
            columnId: 'todo'
        }

        if (!inputText) {
            setDisplayInputField(false)
        } else {
            dispatch(addTodo(todo))
            setInputText('')
        }

    }

    const deleteTodo = (todoId) => {

        dispatch(removeTodo({ todoId, from: 'inbox' }))
    }
    const handleUpdateTodo = (todoId) => {
        setDisable(false)
        dispatch(moveTodo({ todoId, from: 'inbox' }))
    }

    // const handleDrop = (e) => {
    //     e.preventDefault()
    //     const { taskId, from } = JSON.parse(e.dataTransfer.getData('application/json'))
    //     dispatch(moveTodo({ taskId, from, to: 'inbox' }))
    // }

    return (
        <div className=' w-full min-w-[200px] max-w-[700px] h-screen bg-gray-950 rounded-2xl   overflow-hidden'
        >
            <header className='bg-gray-800 px-1 py-2'>
                <h1 className='text-gray-300 font-semibold w-fit  px-3 py-1'>INBOX</h1>
            </header>
            <div className='px-4 py-5 w-full '>
                <button onClick={displayINPUTFIELD} className={`w-full p-2 rounded-md text-gray-400 bg-gray-800 ${displayInputField ? 'hidden' : 'flex justify-center items-center cursor-pointer hover:bg-gray-700 hover:text-gray-300'}`}>Add a card</button>
                {
                    displayInputField ? <div>
                        <input
                            type="text"
                            className=' w-full p-2 text-gray-300 rounded-md placeholder:text-gray-500 bg-gray-800' placeholder='Enter Your Todo'
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div className='w-full  flex gap-2 px-2 pt-3'>
                            <button onClick={addtoTask} className='px-4 py-2 cursor-pointer  rounded-md bg-blue-800 text-gray-300 font-semibold'>Add</button>
                            <button onClick={cancelINPUTFIELD} className='px-3 py-1  rounded-md text-gray-300 cursor-pointer font-semibold'> Cancel</button>
                        </div>
                    </div> : null
                }
                <div

                    className='w-full mt-8 '>
                    <ul
                        // onDragOver={e => e.preventDefault()}
                        // onDrop={handleDrop} 
                        className='w-full px-4'>
                        {
                            inbox.map((todo) => {
                                return <li
                                    draggable
                                    key={todo.id}
                                    onDragStart={(e) => {
                                        const dragData = JSON.stringify({ taskId: todo.id, from: 'inbox' })
                                        e.dataTransfer.setData('application/json', dragData)
                                    }}
                                    onClick={() => handleUpdateTodo(todo.id)}
                                    className={`bg-gray-700 w-full group ${disable ? 'cursor-pointer' : 'cursor-pointer'} relative text-gray-200 font-semibold px-3 py-3 hover:border border-gray-300 hover:scale-102 rounded-md my-2'`}
                                >
                                    <input
                                        type="text"
                                        name="InboxTodo"
                                        id="InboxTodo"
                                        value={todo.todo}
                                        className={`w-fit `}
                                    />
                                    <button onClick={() => deleteTodo(todo.id)} className='absolute bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 right-2 rounded-full bg-gray-600 px-2.5  py-2.5'>
                                        <MdDelete />
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Inbox