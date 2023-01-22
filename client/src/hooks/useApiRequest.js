import { useContext } from "react";
// import axios from "axios";
import axiosInstance from "../axios";
import AppContext from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function useApiRequest() {
    const { token, todoList, setTodoList, setError } = useContext(AppContext);
    const navigate = useNavigate();

    const handleErrors = (e) => {
        if (e.response) 
            if (e.response?.status === 401) 
                navigate('/login');
            else 
                setError(e.response.data?.error || e.response.statusText);    
        else if (e.request)
            setError('Server is not responding.');
    }

    const requestEdit = async (editItem, { text, toggle }, callback) => {
        try {
            const response = await axiosInstance({ 
                method: 'patch', 
                url: `/edit/${editItem._id}`, 
                data: toggle ? { completed: !editItem.completed } : { text }, 
                headers: { Authorization: token }
            });

            if(response.status === 200) {
                setTodoList(todoList.map(item => item._id === editItem._id ? response.data : item));
            }
            setError(null);
            if(callback) callback();
        } catch (e) {
            handleErrors(e);
        }
    }

    const requestNew = async ({ text }) => {
        try {
            const response = await axiosInstance({
                method: 'post',
                url: '/newtodo', 
                data:  { text }, 
                headers: { Authorization: token }
            });
            setTodoList([response.data, ...todoList]);
            setError(null);
        } catch(e) {
            handleErrors(e);
        }
    }

    const requestDelete = async (id) => {
        try {
            await axiosInstance( {
                method: 'delete',
                url: `/delete/${id}`,
                headers: { Authorization: token }
            });
            setTodoList(todoList.filter(todo => id !== todo._id));
        } catch (e) {
            handleErrors(e);
        }
    }

    const requestLogout = async () => {
        try {
            const response = await axiosInstance.get('/logout', { headers: { Authorization: token } })
            if(response.data.logout)
                navigate('/login');
        } catch (e) {
            handleErrors(e);
        }
    }

    return { requestEdit, requestNew, requestDelete, requestLogout };
}