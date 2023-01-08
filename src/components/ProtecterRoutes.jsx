import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtecterRoutes = () => {
    if (localStorage.getItem('token')) {
        // ? estoy logged
        return <Outlet />
    } else {
        // !! NO estoy logged
        return <Navigate to='/login' />
    }
}

export default ProtecterRoutes