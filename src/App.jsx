import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inbox from './components/Inbox'
import WorkFlowContainer from './components/WorkFlowContainer'
import { DndContext } from '@dnd-kit/core'
import { ToastContainer, Bounce } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className='w-full min-h-screen bg-center bg-cover bg-gray-950 md:flex  gap-1 justify-between'
      // style={{backgroundImage : `url('public/img/hex-background-networking (1).jpg')`}}
      >
        <div className=' w-full  md:w-[25%] '>
          <Inbox />
        </div>
        <div className='w-full md:w-[75%] '>
          <WorkFlowContainer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </>
  )
}

export default App
