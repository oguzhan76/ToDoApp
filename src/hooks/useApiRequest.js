import { useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function useApiRequest() {
    const { token, todoList, setTodoList, setError } = useContext(AppContext);
    const navigate = useNavigate();

    const handleErrors = (e) => {
        console.log(e);
        if (e.response.status === 401) navigate('/login');
        else if (e.response) 
            setError(e.response.data.error || e.response.statusText);    
        else if (e.request)
            setError('Server is not responding.');
    }

    const requestEdit = async (editItem, { text, toggle }, callback) => {
        try {
            const response = await axios({ 
                method: 'patch', 
                url: `/edit/${editItem._id}`, 
                data: toggle ? { completed: !editItem.completed } : { text }, 
                headers: { Authorization: token }
            })

            if(response.status === 200) {
                setTodoList(todoList.map(item => item._id === editItem._id ? response.data : item));
            }
            setError(null);
            callback(null);
        } catch (e) {
            handleErrors(e);
        }
    }

    const requestNew = async ({ text }) => {
        try {
            const response = await axios({
                method: 'post',
                url: '/newtodo', 
                data:  { text }, 
                headers: { Authorization: token }
            })
            console.log('new todo response: ', response.data); 
            setTodoList([response.data, ...todoList]);
            setError(null);
        } catch(e) {
            handleErrors(e);
        }
    }

    return { requestEdit, requestNew };
}