import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage/HomePage'
import Header from './Components/HeaderComps/HeaderComp'

function App() {

  return (
    <>
      <div className='app'>
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
