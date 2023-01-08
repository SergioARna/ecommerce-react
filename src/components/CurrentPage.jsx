import React from 'react'
import { Link } from 'react-router-dom'

const CurrentPage = ({ currentPage }) => {
    return (
        <div className='history'>
            <Link to='/'>Home</Link>
            <div className='separator'></div>
            <strong>{currentPage}</strong>
        </div>
    )
}

export default CurrentPage