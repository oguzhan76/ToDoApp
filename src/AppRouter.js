import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./components/App";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from './components/SignupPage';

const AppRouter = () => {
    const [accessToken, setAccessToken ] = useState();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage setAccessToken={setAccessToken} /> }/>
                <Route path="/login" element={ <LoginPage setAccessToken={setAccessToken} /> }/>
                <Route path="/signup" element={ <SignupPage setAccessToken={setAccessToken} /> }/>
                <Route path='/app' element={<App accessToken={accessToken}/>} />
            </Routes>
        </BrowserRouter>
    )    
    
}


export default AppRouter;