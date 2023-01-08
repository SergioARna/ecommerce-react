import React from 'react'
import { useNavigate } from 'react-router-dom'
import CartModal from './CartModal'
import './styles/navigation.css'

const Navigation = ({ isCartOpen, setIsCartOpen }) => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/user')
    }

    const handleHome = () => {
        navigate('/')
    }

    const handlePurchases = () => {
        navigate('/purchases')
    }

    const openCart = () => {
        if (localStorage.getItem('token')) {
            setIsCartOpen(!isCartOpen)
        } else {
            navigate('/login')
        }
    }

    return (
        <nav className='nav'>
            <div className="nav__title">
                <strong onClick={handleHome}>e-commerce</strong>
            </div>
            <ul className='list__items'>
                <li className='item-icon' onClick={handleLogin}>
                    <i className='bx bx-user icon' ></i>
                </li>
                <li className='item-icon' onClick={handlePurchases}>
                    <i className='bx bx-box icon' ></i>
                </li>
                <li className='item-icon'
                    onClick={openCart}
                    style={{ color: !isCartOpen ? '#ababab' : '' }}
                >
                    <i className='bx bx-cart icon' ></i>
                </li>
            </ul>
            <div className={`cart__modal ${isCartOpen ? 'open' : ''}`}>
                <CartModal isCartOpen={isCartOpen} handleClose={() => setIsCartOpen(false)} />
            </div>
            {
                isCartOpen &&
                <div className='overlay' onClick={() => setIsCartOpen(false)}></div>
            }
        </nav>
    )
}

export default Navigation