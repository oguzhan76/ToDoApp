import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import CreateOrEditModal from './CreateOrEditModal';
import TodoList from './TodoList';
import Header from "./Header";
import axios from "axios";

const App = () => {
    const { setTodoList, token, setToken } = useContext(AppContext);
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