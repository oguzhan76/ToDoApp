import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const LandingPage = () => {
    const [response, setResponse ] = useState();

    useEffect(() => { 
        axios.get('/deneme').then(response => setResponse(response.data.success));
    }, []);
    
    return (
        <div style={{color: "white"}}>
            <p>Landing Page </p>
            <p>{response && response}</p>
        </div>
    )
}

export default LandingPage;