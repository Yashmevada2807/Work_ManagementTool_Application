import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inbox from './components/Inbox'
import WorkFlowContainer from './components/WorkFlowContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-full min-h-screen bg-gray-950 px-10 py-15 flex justify-between'>
      <div className='w-[1/2] border border-white'>
        <Inbox/>
      </div>
      <div className='w-[1/2] border border-white'>
      <WorkFlowContainer/>
      </div>
    </div>
    </>
  )
}

export default App
