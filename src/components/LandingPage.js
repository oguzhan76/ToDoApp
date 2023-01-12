import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const navigate = useNavigate();
    const [ error, setError ] = useState();

    axios.get('/access_token')
        .then(response => {
            if(response.headers.authorization) {
                props.setAccessToken(response.headers.authorization);
                navigate('/app');
            }
            else navigate('/login');
        })
        .catch(e => {
            if (e.response.status === 500)                
                setError('Server is not responding.');
            else
                setError(e.message);
        })
    
    return (
        <div>
        {error && <p className='login-error-message'>{error}</p>}
        </div>
    )
}

export default LandingPage;