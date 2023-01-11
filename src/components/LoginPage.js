import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username"></input>
            <input type="text" name="password" placeholder="password"></input>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginPage;