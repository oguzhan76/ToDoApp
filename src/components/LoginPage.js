import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [ error, setError ] = useState();

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
            else throw new Error('Login Failed!')
        })
        .catch(e => {
            if (e.response.status === 500)                
                setError('Server is not responding.');
            else
                setError(e.response.data ? e.response.data.error : e.message);
        });
    
        e.target.password.value = '';
    }

    return (    
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                {error && <p className='login-error-message'>{error}</p>}
                <input type="text" name="username" placeholder="username"></input>
                <input autoComplete='off' type="text" name="password" placeholder="password"></input>
                <button className='login-button' type="submit">Login</button>
                <NavLink className='login-navlink' to='/signup'>Sign up</NavLink>
            </form>
        </div>
    )
}

export default LoginPage;