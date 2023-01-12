import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import CreateOrEditModal from './CreateOrEditModal';
import TodoList from './TodoList';
import Header from "./Header";
import axios from "axios";

const App = (props) => {
    // check if we have an access_token yet

    // Get data from local storage when mounted.
    const loadList = () => {    
        console.log('Data is gotten from local storage');
        const data = JSON.parse(localStorage.getItem('todoList'));
        return data || [];
    }
    const token = props.accessToken;
    const navigate = useNavigate();
    const [ error, setError ] = useState();

    const [ todoList, setTodoList ] = useState(loadList);
    const [ showModal, setShowModal ] = useState(false);
    const [ editItem, setEditItem ] = useState(null);
    const [ filter, setFilter ] = useState('all');
    const [ searchFilter, setSearchFilter ] = useState('');
    const initializing = useRef(true);


    if(!token) {
        axios.get('/access_token')
        .then(response => {
            if(response.headers.authorization) {
                props.setAccessToken(response.headers.authorization);
            }
            else navigate('/login');
        })
        .catch(e => {
            if (e.response.status === 500)                
                setError('Server is not responding.');
            else
                setError(e.message);
        })
    }

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
                <AppContext.Provider value={{ 
                    showModal, 
                    setShowModal, 
                    editItem,
                    setEditItem, 
                    todoList, 
                    setTodoList, 
                    filter, 
                    setFilter,
                    searchFilter,
                    setSearchFilter,
                    token
                }}>
                    <div className="app">
                        <Header />
                        <TodoList />
                        <CreateOrEditModal />
                    </div>
                </AppContext.Provider>
        </div>
    )
}

export default App;