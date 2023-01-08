import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoadingGlobal } from '../store/slices/loading.slice'
import './styles/signUp.css'

const SignUp = () => {

    const navigate = useNavigate()
    const { handleSubmit, register, reset } = useForm()
    const dispatch = useDispatch()

    const handleLogin = () => {
        navigate('/login')
    }

    const submit = (data) => {

        const URL = 'https://e-commerce-api.academlo.tech/api/v1/users'
        dispatch(setLoadingGlobal(true))
        axios.post(URL, data)
            .then(() => {
                navigate(-1)
            })
            .catch(err => console.log(err))
            .finally(() => dispatch(setLoadingGlobal(false)))

        reset({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: ""
        })
    }

    return (
        <section className='sign-up__content'>
            <div className='sign-up__container'>
                <h2 className='sign__up-title'>Sign Up</h2>
                <form className='sign-form' onSubmit={handleSubmit(submit)}>
                    <div className="form__content">
                        <label htmlFor="firstName" className="form__label">First Name</label>
                        <input className='form__input' id='firstName' type="text" {...register("firstName")} />
                    </div>
                    <div className="form__content">
                        <label htmlFor="lastName" className="form__label">Last Name</label>
                        <input className='form__input' id='lastName' type="text" {...register("lastName")} />
                    </div>
                    <div className="form__content">
                        <label htmlFor="email" className="form__label">Email</label>
                        <input className='form__input' id='email' type="email" {...register("email")} />
                    </div>
                    <div className="form__content">
                        <label htmlFor="password" className="form__label">Password</label>
                        <input className='form__input' id='password' type="password" {...register("password")} />
                    </div>
                    <div className="form__content">
                        <label htmlFor="phone" className="form__label">Phone (10 characters)</label>
                        <input className='form__input' id='phone' type="text" {...register("phone")} />
                    </div>
                    {/* <div className="form__content">
                        <label htmlFor="role" className="form__label">Role</label>
                        <input className='form__input' id='role' type="text" {...register("role")} />
                    </div> */}
                    <button className='signUp-btn'>Sign Up</button>
                </form>
                <div className="sing-up">
                    <span>I have an account</span>
                    <button className='up-btn' onClick={handleLogin}>Log in</button>
                </div>
            </div>
        </section>
    )
}

export default SignUp