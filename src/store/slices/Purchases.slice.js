import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setLoadingGlobal } from "./loading.slice";

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchasesGlobal: (state, actions) => actions.payload
    }
})

export const { setPurchasesGlobal } = purchasesSlice.actions

export default purchasesSlice.reducer

export const getPurchasesCartThunk = () => (dispatch) => {
    dispatch(setLoadingGlobal(true))
    const URL = 'https://e-commerce-api.academlo.tech/api/v1/purchases'
    return axios.post(URL, {}, getConfig())
        .then(() => {
            dispatch(getPurchasesCartThunk())
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoadingGlobal(false)))
}