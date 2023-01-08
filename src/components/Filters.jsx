import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getProductByCategory, getProductsThunk } from '../store/slices/products.slice'
import ToOrderProducts from './Home/ToOrderProducts'
// import getConfig from '../utils/getConfig'
import './styles/filters.css'

const Filters = ({ setInputPrice, setInputValue, handleClose }) => {

    const [categoriesFilter, setCategoriesFilter] = useState([])
    const dispatch = useDispatch()
    // const { reset } = useForm()
    // apertura y cierre de los filtros
    const [isClose, setIsClose] = useState(false)
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/products/categories'
        axios.get(URL)
            .then(res => setCategoriesFilter(res.data.data.categories))
            .catch(err => console.log(err))
    }, [])

    const handleClick = (id) => {
        dispatch(getProductByCategory(id))
        setInputValue('')
        handleClose()
    }

    const handleAllProducts = () => {
        dispatch(getProductsThunk())
        setInputValue('')
        handleClose()
    }

    const handleSubmitPrice = (e) => {
        e.preventDefault();
        let inputFrom = +e.target.from.value;
        let inputTo = +e.target.to.value;
        if (inputFrom && inputTo) {
            setInputPrice({
                from: inputFrom,
                to: inputTo,
            });
        } else if (!inputFrom && inputTo) {
            setInputPrice({
                from: 0,
                to: inputTo,
            });
        } else if (inputFrom && !inputTo) {
            setInputPrice({
                from: inputFrom,
                to: Infinity,
            });
        } else {
            setInputPrice({
                from: 0,
                to: Infinity,
            });
        }
        handleClose()
    }

    return (
        <section className='filter__content'>
            <aside className={`filter__price ${isClose ? '' : 'closed'} `}>
                <article className="filter__header" onClick={() => setIsClose(!isClose)}>
                    <p className='filter__title'>Price</p>
                    <i className={`bx ${isClose ? 'bx-chevron-up' : 'bx-chevron-down'} icon`}></i>
                </article>
                <form className='form__filter' onSubmit={handleSubmitPrice}>
                    <div className='form__filter-from'>
                        <label className='form__filter-label' htmlFor="from">From</label>
                        <input className='form__filter-input' type="number" id='from' />
                    </div>
                    <div className='form__filter-from'>
                        <label className='form__filter-label' htmlFor="to">To</label>
                        <input className='form__filter-input' type="number" id='to' />
                    </div>
                    <button className='filter__btn'>Apply</button>
                </form>
            </aside>
            <aside className={`filter__category ${isOpen ? '' : 'closed'} `}>
                <article className="filter__header" onClick={() => setIsOpen(!isOpen)}>
                    <p className='filter__title'>Category</p>
                    <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} icon`} ></i>
                </article>
                <div className="category__list">
                    <ul>
                        <li><button className='list__items' onClick={handleAllProducts}>All Products</button></li>
                        {
                            categoriesFilter?.map(sCategory => (
                                <li key={sCategory.id}>
                                    <button onClick={() => handleClick(sCategory.id)} className='list__items'>{sCategory.name}</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </aside>
            <aside>
                <ToOrderProducts handleClose={handleClose} />
            </aside>
        </section>
    )
}

export default Filters