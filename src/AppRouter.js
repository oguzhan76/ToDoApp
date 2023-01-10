import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./components/App";
import LoginPage from './components/LoginPage';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <LoginPage /> }/>
            <Route path='/home' element={<App />} />
        </Routes>
    </BrowserRouter>

)

export default AppRouter;