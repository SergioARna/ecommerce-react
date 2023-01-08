import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoadingGlobal } from '../store/slices/loading.slice'
import './styles/login.css'

const Login = () => {
    const navigate = useNavigate()
    const { handleSubmit, reset, register } = useForm()
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const handleSignUp = () => {
        navigate('/signUp')
    }

    const submit = (data) => {
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/users/login'
        dispatch(setLoadingGlobal(true))
        axios.post(URL, data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userName", res.data.data.user.firstName
                    + " " + res.data.data.user.lastName);
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
            })
            .catch(() => setError('Invalid Credentials'))
            .finally(() => dispatch(setLoadingGlobal(false)))

        reset({
            email: "",
            password: ""
        })
    }

    return (
        <section className='login__container'>
            <div className='login__content'>
                <strong className='login__title'>Welcome! Enter your email and password to continue</strong>
                <div className='login__data'>
                    <h4 className='data__title'>Test Data</h4>
                    <p className='data__email'><span className='icon'><i className='bx bx-envelope' ></i></span> max@gmail.com</p>
                    <p className='data__pass'><span className='icon'><i className='bx bx-lock-alt' ></i></span> pass1234</p>
                </div>
                <form className='login__form' onSubmit={handleSubmit(submit)}>
                    <div className='form__content'>
                        <label className='form__label' htmlFor="email">Email</label>
                        <input className='form__input' id='email' type="email" placeholder='Enter to Email' {...register("email")} />
                    </div>
                    <div className='form__content'>
                        <label className='form__label' htmlFor="password">Password</label>
                        <input className='form__input' id='password' type="password" placeholder='Enter to password' {...register("password")} />
                    </div>
                    <div className='error-message'>{error}</div>
                    <button className='login__btn'>Login</button>
                </form>
                <div className="sing-up">
                    <span>Don't have an account?</span>
                    <button className='up-btn' onClick={handleSignUp}>Sign up</button>
                </div>
            </div>
        </section>
    )
}

export default Login


