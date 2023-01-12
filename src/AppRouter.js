import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./components/App";
import LoginPage from "./components/LoginPage";
import SignupPage from './components/SignupPage';

const AppRouter = () => {
    const [accessToken, setAccessToken ] = useState();
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App accessToken={accessToken} setAccessToken={setAccessToken}/>} />
                <Route path="/login" element={ <LoginPage setAccessToken={setAccessToken} /> }/>
                <Route path="/signup" element={ <SignupPage setAccessToken={setAccessToken} /> }/>
            </Routes>
        </BrowserRouter>
    )    
}

export default AppRouter;