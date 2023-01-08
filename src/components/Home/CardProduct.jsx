import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserCart } from '../../store/slices/cart.slice'
import getConfig from '../../utils/getConfig'
import Swal from 'sweetalert2'

// Styles Css
import './style/cardProduct.css'
import { setLoadingGlobal } from '../../store/slices/loading.slice'

const CardProduct = ({ product, setIsCartOpen }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const handleClick = () => {
        navigate(`/product/${product.id}`)
    }

    const updateQuantity = () => {
        const productQuantity = cart?.filter(quantity => {
            if (quantity.id === product.id) {
                return quantity
            }
        })

        const value = productQuantity[0].productsInCart.quantity + 1

        const data = {
            id: product.id,
            newQuantity: value
        }
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
        dispatch(setLoadingGlobal(true))
        axios.patch(URL, data, getConfig())
            .then(() => dispatch(getUserCart()))
            .catch(err => console.log(err))
            .finally(() => dispatch(setLoadingGlobal(false)))
    }

    const handleBtnClick = (e) => {
        e.stopPropagation()
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'

        const data = {
            id: product.id,
            quantity: 1
        }
        dispatch(setLoadingGlobal(true))
        axios.post(URL, data, getConfig())
            .then(() => {
                dispatch(getUserCart())
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'product add to cart'
                })
                setIsCartOpen(true)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login')
                } else {
                    updateQuantity()
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Quantity Update'
                    })
                }
            })
            .finally(() => dispatch(setLoadingGlobal(false)))
        setIsCartOpen(false)
    }

    return (
        <div className="box__content-card">
            <article className='card__content' onClick={handleClick}>
                <header className='card__header'>
                    <div className="card__img">
                        <img className='over' src={product.productImgs[1]} alt={product.title} />
                        <img className='img__primary' src={product.productImgs[0]} alt={product.title} />
                    </div>
                </header>
                <section className='card__description'>
                    <h2 className='card__title'>
                        {product.title}
                    </h2>
                    <article className='card__price'>
                        <span className='card__item-price'>Price</span>
                        <h3 className='card__item-valor'>{product.price}</h3>
                    </article>
                    <button className='card__btn' onClick={handleBtnClick}><i className='bx bx-cart-add icon'></i></button>
                </section>
            </article>
        </div>
    )
}

export default CardProduct