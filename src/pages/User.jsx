import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/user.css'

const User = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem("token", "")
        localStorage.setItem("userName", "")
        navigate('/login')
    }

    return (
        <div className='user__container'>
            <div className="user__content">
                <div className="user__info">
                    <div className="user__img">
                        <img src="/avatar.png" alt="UserAvatar" />
                    </div>
                    <strong className='user__name'>{localStorage.getItem("userName")}</strong>
                    <button className='user__btn' onClick={logout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default User