import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import CreateOrEditModal from './CreateOrEditModal';
import TodoList from './TodoList';
import Header from "./Header";
import axios from "axios";

const App = (props) => {
    // check if we have an access_token yet

    const { todoList, setTodoList, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [ error, setError ] = useState();
    const initializing = useRef(true);

    useEffect(() => {
        // Get data from local storage when mounted.
        console.log('Data is gotten from local storage');
        const data = JSON.parse(localStorage.getItem('todoList'));
        setTodoList(data || []);
        
        // Request access token if there isn't any
        if(!token) {
            
            axios.get('/access_token')
            .then(response => {
                if(response.headers.authorization) {
                    setToken(response.headers.authorization);
                    console.log('Got new access token')
                }
                else navigate('/login');
            })
            .catch(e => {
                if (e.response.status === 500)                
                    setError('Server is not responding.');
                else
                    setError(e.message);
            });
        }
    }, []);
    
    //write to storage
    useEffect(() => {
        // Using initializing state to prevent it to write when first mounted
        if(todoList === undefined || initializing.current === true) {
            initializing.current = false;
            return;
        }
        console.log('writing to localStorage', todoList);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]) 

    return (
        !token ? error && <p className='login-error-message'>{error}</p> :
        <div className="homepage">
            <div className="app">
                <Header />
                <TodoList />
                <CreateOrEditModal />
            </div>
        </div>
    )
}

export default App;