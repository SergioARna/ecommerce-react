import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProductsThunk } from './store/slices/products.slice'
import Home from './pages/Home'
import ProductInfo from './pages/ProductInfo'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Purchases from './pages/Purchases'
import User from './pages/User'
import ProtecterRoutes from './components/ProtecterRoutes'
import Loading from './components/Loading'

function App() {
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()
  const [isCartOpen, setIsCartOpen] = useState(false)

  console.log(loading);


  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <div className="App">
      {loading ? <Loading /> : ''}

      <Navigation isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Routes>
        {/* Rutas Publicas */}
        <Route path='/' element={<Home isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />} />
        <Route path='/product/:id' element={<ProductInfo setIsCartOpen={setIsCartOpen} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />

        {/* Rutas Protegidas */}
        <Route element={<ProtecterRoutes />}>
          <Route path='/purchases' element={<Purchases />} />
          <Route path='/user' element={<User />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
