import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./components/App";
import LoginPage from "./components/LoginPage";
import SignupPage from './components/SignupPage';
import { AppProvider } from "./contexts/AppContext";

const AppRouter = () => {
    
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path="/login" element={ <LoginPage /> }/>
                    <Route path="/signup" element={ <SignupPage /> }/>
                </Routes>
            </AppProvider>
        </BrowserRouter>
    )    
}

export default AppRouter;