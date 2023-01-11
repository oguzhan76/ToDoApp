import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const navigate = useNavigate();

    axios.get('/access_token')
        .then(response => {
            if(response.headers.authorization) {
                props.setAccessToken(response.headers.authorization);
                navigate('/app');
            }
            else navigate('/login');
        })
        .catch(e => console.log('err', e.message));
    
    return (
        <div>
        </div>
    )
}

export default LandingPage;