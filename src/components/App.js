import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import CreateOrEditModal from './CreateOrEditModal';
import TodoList from './TodoList';
import Header from "./Header";
import axios from "axios";

const App = () => {
    const { error, setError, setTodoList, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Component did mount');

        const fetchData = async () => {
            console.log('fetch data runs');
            try {
                // When directed from login screen we have token, only when page is refreshed it is null.
                if(!token) {
                    console.log('token yok');
                    var response = await axios.get('/access_token');
                    if(!response.headers.authorization)
                       navigate('/login');
                    else
                        setToken(response.headers.authorization);
                }

                const listResponse = await axios.get("/getList", { headers: { authorization: token || response.headers.authorization }});
                console.log('got the list from server: ', listResponse.data);
                setTodoList(listResponse.data);
                setError(null);
            } catch (e) {
                console.log(e);
                if (e.response) 
                    if (e.response?.status === 401) 
                        navigate('/login');
                    else 
                        setError(e.response.data?.error || e.response.statusText);    
                else if (e.request)
                    setError('Server is not responding.');
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {error && <p className='login-error-message'>{error}</p>}
            <div className="homepage">
                <div className="app">
                    <Header />
                    <TodoList />
                    <CreateOrEditModal />
                </div>
            </div>
        </div>
    )
}

export default App;