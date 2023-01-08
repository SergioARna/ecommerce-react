import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../pages/styles/purchases.css'

const PurchasesItems = ({ purchase }) => {


    const navigate = useNavigate()

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const date = new Date(purchase.createdAt).toLocaleDateString('en-us', options)

    return (
        <div className='purchases__items'>
            <div className='purchases__header'>
                <header> <strong>{date}</strong> </header>
            </div>

            <ul className='purchases__products-list'>
                {
                    purchase.cart.products.map(productItem => (
                        <li className='purchases__products-items' key={productItem.id}
                            onClick={() => navigate(`/product/${productItem.id}`)}
                        >
                            <h4 className='purchases__name'>
                                {productItem.title}
                            </h4>
                            <span className='purchases__quantity'>
                                <div className='purchases__box'>
                                    {productItem.productsInCart.quantity}
                                </div>
                            </span>
                            <div className='purchases__price'>
                                $ {productItem.price * productItem.productsInCart.quantity}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PurchasesItems