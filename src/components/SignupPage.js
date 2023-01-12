import React  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SignupPage = (props) => {
    const navigate = useNavigate();
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/signup', { 
            username: e.target.username.value,
            password: e.target.password.value 
        })
        .then(response => {
            setSuccess(true);
            const access_token = response.headers.authorization.replace('Bearer ', '');
            props.setAccessToken(access_token);
            console.log(access_token);
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
                    <h1 className='signup-success__header'>Success!</h1>
                    <button className='signup-success__button' onClick={() => navigate('/')}>Get Started</button>
                </div>
            )
                : (  
                    <div className='login-container'>
                        <form className='login-form' onSubmit={handleSubmit}>
                            {error && <p className='login-error-message'>{error}</p>}
                            <input autoComplete='off' type="text" name="username" placeholder="username"></input>
                            <input autoComplete='off' type="text" name="password" placeholder="password"></input>
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