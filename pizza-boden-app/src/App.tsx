import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage/HomePage'

function App() {

  return (
    <>
      <div className='app'>
      <Routes>
          <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
