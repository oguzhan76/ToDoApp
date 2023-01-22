import React, { useState, useRef, useEffect, useContext } from 'react';
// import axios from 'axios';
import axiosInstance from '../axios';
import { useNavigate, NavLink } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const LoginPage = () => {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const userRef = useRef();
    const [ error, setError ] = useState();

    useEffect(() => {
        userRef.current.focus();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axiosInstance( {
            method: 'post',
            url: '/login',
            data: { 
                    username: e.target.username.value,
                    password: e.target.password.value 
                }});
        console.log(response);
        if(response.headers.authorization) {
            setToken(response.headers.authorization);
            navigate('/');
        }
        else throw new Error('Login Failed!');
        } catch(e) {
            if(!e.response)
                setError(e.message);
            else if (e.response.status === 500)                
                setError('Server not responding.');
            else
                setError(e.response.data.error);
        }
    
        e.target.password.value = '';
    }

    return (    
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                {error && <p className='login-error-message'>{error}</p>}
                <input ref={userRef} type="text" name="username" placeholder="username"></input>
                <input autoComplete='off' type="text" name="password" placeholder="password"></input>
                <button className='login-button' type="submit">Login</button>
                <NavLink className='login-navlink' to='/signup'>Sign up</NavLink>
            </form>
        </div>
    )
}

export default LoginPage;