import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardProduct from '../components/Home/CardProduct'
import ProductDescription from '../components/productInfo/ProductDescription'

// ? Style Css
import './styles/productInfo.css'

const ProductInfo = ({ setIsCartOpen }) => {
    const { id } = useParams()
    const allProducts = useSelector(state => state.products)

    const [product, setProduct] = useState()
    const [similarProducts, setSimilarProducts] = useState()

    const getProductById = () => {
        const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`
        axios.get(URL)
            .then(res => setProduct(res.data.data.product))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        getProductById()
    }, [id])

    useEffect(() => {
        if (allProducts && product) {
            const pivot = allProducts.filter(prod => prod.category.name === product.category)
            setSimilarProducts(pivot)
        }
    }, [allProducts, product])

    return (
        <div className='similar__content'>
            <ProductDescription product={product} setIsCartOpen={setIsCartOpen} />
            <section className='similar__description'>
                <h2 className='semilar__title'>Discover similar items</h2>
                <div className='similar__product-container'>
                    {
                        similarProducts?.map(sProduct => {
                            if (sProduct.title !== product.title) {
                                return (
                                    <CardProduct
                                        key={sProduct.id}
                                        product={sProduct}
                                    />
                                )
                            }
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default ProductInfo