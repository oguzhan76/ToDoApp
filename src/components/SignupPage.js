import React, { useRef, useEffect, useContext }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const SignupPage = (props) => {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState();
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/signup', { 
            username: e.target.username.value,
            password: e.target.password.value 
        })
        .then(response => {
            setSuccess(true);
            const access_token = response.headers.authorization.replace('Bearer ', '');
            setToken(access_token);
        })
        .catch(e => {
            if (e.response.status === 500)                
                setError('Server not responding.');
            else
                setError(e.response ? e.response.data.error : e.message);
        });
        e.target.password.value = '';
    }

    return (    
        <div className='login-container'>
            {success ? (
                <div className='signup-success'>
                    <h1 className='signup-success__header'>Welcome!</h1>
                    <button className='signup-success__button' onClick={() => navigate('/')}>Get Started</button>
                </div>
            )
                : (  
                    <div className='login-container'>
                        <form className='login-form' onSubmit={handleSubmit}>
                            {error && <p className='login-error-message'>{error}</p>}
                            <input 
                                ref={userRef} 
                                autoComplete='off' 
                                type="text" 
                                name="username" 
                                placeholder="username"
                                required
                            >
                            </input>
                            <input 
                                autoComplete='off' 
                                type="text" 
                                name="password" 
                                placeholder="password"
                                required    
                            >
                            </input>
                            <button className='login-button' type="submit">Signup</button>
                            <NavLink className='login-navlink' to='/login'>Login</NavLink>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default SignupPage;