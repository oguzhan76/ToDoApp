import React from 'react';
import ReactDOM from 'react-dom/client';
import 'sanitize.css';
import AppRouter from './AppRouter';
import './styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <AppRouter />
    // </React.StrictMode>
);