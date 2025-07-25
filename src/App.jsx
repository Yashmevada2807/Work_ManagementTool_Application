import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inbox from './components/Inbox'
import WorkFlowContainer from './components/WorkFlowContainer'
import { DndContext } from '@dnd-kit/core'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className='w-full min-h-screen bg-center bg-cover bg-zinc-900  px-10 py-1 md:flex  gap-4 justify-between'
      // style={{backgroundImage : `url('public/img/hex-background-networking (1).jpg')`}}
      >
          <div className=' w-full mb-4 md:w-[25%] '>
            <Inbox />
          </div>
          <div className='w-full md:w-[75%] '>
            <WorkFlowContainer />
          </div>
      </div>
    </>
  )
}

export default App
