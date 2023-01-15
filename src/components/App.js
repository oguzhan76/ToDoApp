import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import CreateOrEditModal from './CreateOrEditModal';
import TodoList from './TodoList';
import Header from "./Header";
import axios from "axios";

const App = () => {
    const { todoList, setTodoList, token, setToken } = useContext(AppContext);
    // console.log('app rendered', todoList);
    const navigate = useNavigate();
    const [ error, setError ] = useState();

    useEffect(() => {
        console.log('Component did mount useEffect');
        const fetchData = async () => {
            try {
                const response = await axios.get('/access_token');
                if(!response.headers.authorization)
                    navigate('/login');

                setToken(response.headers.authorization);
                const listResponse = await axios.get("/getList", { headers: { authorization: response.headers.authorization }});
                console.log('got the list from server: ', listResponse.data);
                setTodoList(listResponse.data);
            } catch (e) {
                if (!e.response) 
                    setError('Server is not responding.');
                else
                    setError(e.response.data);            
            }
        }

        fetchData();
        // Request access token if there isn't any
        // if(!token) {
        //     axios.get('/access_token')
        //     .then(response => {
        //         if(response.headers.authorization) {
        //             setToken(response.headers.authorization);
        //             console.log('Got new access token');
                    
        //             console.log('Error sonrasi');
        //             console.log('request todolist from server');
        //             // get the list from server
        //             setTodoList([]);
        //         }
        //         else navigate('/login');
        //     })
        //     .catch(e => {
        //         if (e.response.status === 500)                
        //             setError('Server is not responding.');
        //         else
        //             setError(e.message);
        //     });
        // }
    }, []);

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