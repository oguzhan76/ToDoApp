import React  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = (props) => {
    const navigate = useNavigate();
    const [ success, setSuccess ] = useState(false);

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
            if(e.response)
                console.error(e.response.data);
            else
                console.log(e.message);
        });
        e.target.password.value = '';
    }

    const handleGetStarted = () => {
        navigate('/home')
    }

    return (    
        <div>
            {success ? (
                <div>
                <h1 className='success'>Success</h1>
                <button onClick={handleGetStarted}>Get Started</button>
                </div>
            )
                : (  
                    <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="username"></input>
                    <input type="text" name="password" placeholder="password"></input>
                    <button type="submit">Submit</button>
                    </form>
                )
            }
        </div>
    )
}

export default SignupPage;