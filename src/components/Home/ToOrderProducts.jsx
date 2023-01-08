import React from 'react'
import { useDispatch } from 'react-redux'
import { ascendingOrderProducts, ascendingOrderProductsByName, descendingOrderPRoducts, descendingOrderProductsByName } from '../../store/slices/products.slice'
import './style/toOrderProducts.css'

const ToOrderProducts = ({ handleClose }) => {
    const dispatch = useDispatch()

    const handleAscending = () => {
        dispatch(ascendingOrderProducts())
        handleClose()
    }

    const handleDescending = () => {
        dispatch(descendingOrderPRoducts())
        handleClose()
    }

    const handleAsTitle = () => {
        dispatch(ascendingOrderProductsByName())
        handleClose()
    }

    const handleDesTitle = () => {
        dispatch(descendingOrderProductsByName())
        handleClose()
    }
    return (
        <div className='order__container'>
            <button className='order__btn' onClick={handleAscending}>Ascending Price</button>
            <button className='order__btn' onClick={handleDescending}>Descending Price</button>
            <button className='order__btn' onClick={handleAsTitle}>A - Z</button>
            <button className='order__btn' onClick={handleDesTitle}>Z - A</button>
        </div>
    )
}

export default ToOrderProducts