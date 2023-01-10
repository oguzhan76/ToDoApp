import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'sanitize.css';
import './styles/styles.scss';
import LandingPage from './components/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LandingPage />
    </React.StrictMode>
);