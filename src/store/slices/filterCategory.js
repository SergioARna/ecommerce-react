import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const categoryFilter = createSlice({
    name: "category",
    initialState: null,
    reducers: {
        setGlobalCategoty: (state, actions) => actions.payload
    }
})

export const { setGlobalCategoty } = categoryFilter.actions

export default categoryFilter.reducer

export const getCategotyThunk = () => (dispatch) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/products/categories"
    return axios.get(URL, getConfig())
        .then(res => dispatch(setGlobalCategoty(res.data.data.categories)))
        .catch(err => console.log(err))
}