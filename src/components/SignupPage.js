import React, { useRef, useEffect, useContext }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const SignupPage = () => {
    const { setToken } = useContext(AppContext);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState();
    const userRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', { 
                username: e.target.username.value,
                password: e.target.password.value 
            })
            if(!response.headers.authorization) 
                throw new Error("Server error.");
            setSuccess(true);
            setToken(response.headers.authorization);
        } catch (e) {
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