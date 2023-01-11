import React from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const LoginPage = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/login', { 
            username: e.target.username.value,
            password: e.target.password.value 
        })
        .then(response => {
            if(response.headers.authorization) {
                props.setAccessToken(response.headers.authorization);
                navigate('/app');
            }
            throw new Error('Login Failed!')
        })
        .catch(e => {
            if(e.response)
                console.error(e.response.data);
            else
                console.log(e.message);
        });
    
        e.target.password.value = '';
    }

    return (    
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username"></input>
                <input autoComplete='off' type="text" name="password" placeholder="password"></input>
                <button className='login-button' type="submit">Login</button>
                <NavLink className='login-navlink' to='/signup'>Sign up</NavLink>
            </form>
        </div>
    )
}

export default LoginPage;