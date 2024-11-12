import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage/HomePage'
import Header from './Components/HeaderComps/HeaderComp'
import AboutPage from './Pages/AboutPage/AboutPage'

function App() {

  return (
    <>
      <div className='app'>
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/AboutPage' element={<AboutPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
