import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CurrentPage from '../components/CurrentPage'
import PurchasesItems from '../components/PurchasesItems'
import { setLoadingGlobal } from '../store/slices/loading.slice'
import getConfig from '../utils/getConfig'

import './styles/purchases.css'

const Purchases = () => {

    const [purchases, setPurchases] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoadingGlobal(true))
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/purchases'
        axios.get(URL, getConfig())
            .then(res => {
                const purchases = res.data.data.purchases.sort((a, b) => {
                    const prevDate = new Date(a.createdAt)
                    const nextDate = new Date(b.createdAt)
                    return nextDate - prevDate;
                })
                setPurchases(purchases)
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(setLoadingGlobal(false)))
    }, [])

    return (
        <section className='purchases__content'>
            <CurrentPage currentPage='purchases' />
            <h1 className='purchases__title'>Purchases</h1>
            <div className='purchases-logic'>
                {
                    purchases ? (
                        purchases.map(purchase => (
                            <PurchasesItems key={purchase.id} purchase={purchase} />
                        ))
                    ) : (
                        <p className='message'>
                            You haven't bought anything yet. <Link to='/'>See Products</Link>
                        </p>
                    )
                }
            </div>
        </section>
    )
}

export default Purchases