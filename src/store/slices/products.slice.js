import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoadingGlobal } from "./loading.slice";

const productsSlice = createSlice({
    name: 'products',
    initialState: null,
    reducers: {
        setProductsGlobal: (state, action) => action.payload,
        ascendingOrderProducts: state => {
            state.sort((a, b) => +a.price - +b.price)
        },
        descendingOrderPRoducts: state => {
            state.sort((a, b) => +b.price - +a.price)
        },
        ascendingOrderProductsByName: (state) => {
            state.sort((a, b) => a.title.localeCompare(b.title));
        },
        descendingOrderProductsByName: (state) => {
            state.sort((a, b) => b.title.localeCompare(a.title));
        },
    }
})
// ,descendingOrderPRoducts:

export const { setProductsGlobal, ascendingOrderProducts, descendingOrderPRoducts, ascendingOrderProductsByName,
    descendingOrderProductsByName } = productsSlice.actions

export default productsSlice.reducer

export const getProductsThunk = () => (dispatch) => {
    dispatch(setLoadingGlobal(true))
    const URL = 'https://e-commerce-api.academlo.tech/api/v1/products'
    return axios.get(URL)
        .then(res => {
            dispatch(setProductsGlobal(res.data.data.products))
            dispatch(setLoadingGlobal(false))
        })
        .catch(err => console.log(err))
}

export const getProductByCategory = (id) => (dispatch) => {
    dispatch(setLoadingGlobal(true))
    const URL = `https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`
    return axios.get(URL)
        .then(res => {
            dispatch(setProductsGlobal(res.data.data.products))
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoadingGlobal(false)))
}