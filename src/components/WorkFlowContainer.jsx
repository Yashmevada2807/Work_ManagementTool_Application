import React, { useState } from 'react'
import TaskDisplayCard from './TaskDisplayCard'
import InProgressCard from './InProgressCard'
import TaskOverCard from './TaskOverCard'

const WorkFlowContainer = () => {

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }


  return (
    <div onClick={cancelEdit} className=' w-full min-w-[200px] h-screen  bg-gradient-to-tl from-purple-950 via-purple-500 to-purple-950  overflow-hidden ' >
      <header className='bg-purple-950 border-b border-purple-500 px-1 py-2'>
        <h1 className='text-gray-300 w-fit text-xl font-semibold px-3 py-1'>Kanban Board</h1>
      </header>
      <div className='mt-1 w-full  md:flex md:justify-evenly  border-white justify-center items-start p-4'>
        <div className='w-full flex justify-start items-start  px-10 py-4 sm:px-7'>
          <TaskDisplayCard />
        </div>
        <div className='w-full flex justify-start items-start px-10 py-4 sm:px-7'>
          <InProgressCard />
        </div>
        <div className='w-full flex justify-start items-start px-10 py-4 sm:px-7'>
          <TaskOverCard />
        </div>
      </div>
    </div>
  )
}

export default WorkFlowContainer
