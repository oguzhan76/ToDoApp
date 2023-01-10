import React  from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [success, setSuccess ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/signup', { 
            username: e.target.username.value,
            password: e.target.password.value 
        })
            .then(response => {
                setSuccess(true);
                // if(response.data.token === 'buraya token gelcek')
                //     navigate('/home');
                console.log(response.data);
                // setResponse(response.data);
            })
            .catch(error => console.warn(error));
        
            e.target.reset();
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

export default LoginPage;