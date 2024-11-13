import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage/HomePage'
import Header from './Components/HeaderComps/HeaderComp'
import AboutPage from './Pages/AboutPage/AboutPage'
import MenyPage from './Pages/MenuPage/MenyPage'

function App() {

  return (
    <>
      <div className='app'>
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/AboutPage' element={<AboutPage />} />
          <Route path='/MenyPage' element={<MenyPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App

/**
 * Författare: Victor
 * Routning till hem och about
 * Fix: La till routning till meny
 */