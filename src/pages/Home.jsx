import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Filters from '../components/Filters';
import CardProduct from '../components/Home/CardProduct';

// Style Css
import './styles/home.css'

const Home = ({ isCartOpen, setIsCartOpen }) => {
    const products = useSelector(state => state.products)

    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [productsFilter, setProductsFilter] = useState()
    const [filterPrice, setInputPrice] = useState({
        from: 0,
        to: Infinity
    })
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (products) {
            setProductsFilter(products)
        }
    }, [products])

    const handdleChange = (e) => {
        const inputValue = e.target.value.toLowerCase().trim()
        const filter = products?.filter(prod => prod.title.toLowerCase().includes(inputValue))
        setProductsFilter(filter)
        setInputValue(e.target.value)
    }

    const filterCallBack = priceP => +priceP.price >= filterPrice.from && +priceP.price <= filterPrice.to

    return (
        <div className='main__container-filterBox'>
            <div className='filter__container'>
                <Filters
                    setInputValue={setInputValue}
                    setInputPrice={setInputPrice}
                    setIsOpenFilter={setIsOpenFilter}
                />
            </div>
            <div className="main-content">
                <div className="search__box">
                    <form className='form__container'>
                        <input className='form__input'
                            id='search' type="text"
                            placeholder='What are you looking for?'
                            value={inputValue}
                            onChange={handdleChange}
                        />
                        <button className='form__btn'><i className='bx bx-search' ></i></button>
                    </form>
                    <button className='filter__btn'
                        onClick={() => setIsOpenFilter(!isOpenFilter)}>
                        <i className='bx bx-filter-alt icon' ></i>
                        Filter
                    </button>
                    <div className={`filter-modal ${isOpenFilter ? 'open' : ''}`}>
                        <button className='close' onClick={() => setIsOpenFilter(false)}><i className='bx bx-x' ></i></button>
                        <h5>Filters</h5>
                        <Filters
                            setInputValue={setInputValue}
                            setInputPrice={setInputPrice}
                            handleClose={() => setIsOpenFilter(!isOpenFilter)} />
                    </div>
                </div>
                <div className="products__container">
                    {
                        productsFilter?.filter(filterCallBack).length !== 0 ?
                            productsFilter?.filter(filterCallBack).map(product => (
                                <CardProduct
                                    key={product.id}
                                    product={product}
                                    isCartOpen={isCartOpen}
                                    setIsCartOpen={setIsCartOpen}
                                />
                            ))
                            : <div className='noProduct__price'>
                                <h4>
                                    There are no products for this filter.
                                </h4>
                                <div className='noProduct-img'>
                                    <img src="./empty-cart.png" alt="empty" />
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home