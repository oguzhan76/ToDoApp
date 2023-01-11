import React  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/login', { 
            username: e.target.username.value,
            password: e.target.password.value 
        })
            .then(response => {
                // if(response.data.token === 'buraya token gelcek')
                //     navigate('/home');
                console.log(response.headers);
                console.log(response.headers.authorization);
                // setResponse(response.data);
            })
            .catch(error => console.warn(error));
        
            e.target.reset();
    }

    return (    
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username"></input>
            <input type="text" name="password" placeholder="password"></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginPage;