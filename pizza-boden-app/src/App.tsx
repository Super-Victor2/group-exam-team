import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage/HomePage'
import Header from './Components/HeaderComps/HeaderComp'
import AboutPage from './Pages/AboutPage/AboutPage'
import MenyPage from './Pages/MenuPage/MenyPage'
import CartPage from './Pages/CartPage/CartPage'
import ShipmentInfoPage from './Pages/ShipmentInfoPage/ShipmentInfoPage'
import ConfirmPage from './Pages/ConfirmPage/ConfirmPage'

function App() {

  return (
    <>
      <div className='app'>
      <Header />
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/AboutPage' element={<AboutPage />} />
          <Route path='/MenyPage' element={<MenyPage />} />
          <Route path='/CartPage' element={<CartPage />} />
          <Route path='/ShipmentInfoPage' element={<ShipmentInfoPage />} />
          <Route path='/ConfirmPage' element={<ConfirmPage />} />
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
 * Fix: La till routning till CartPage, ShipmentInfoPage, ConfirmPage
 */