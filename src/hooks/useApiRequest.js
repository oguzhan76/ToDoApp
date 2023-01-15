import { useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext";

export default function useApiRequest() {
    const { token, editItem, todoList, setTodoList } = useContext(AppContext);

    const editTodo = async ({ text, toggle }, callback) => {
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
            callback(null);
        } catch (e) {
            console.log(e);
            if(e.response.data) 
                callback(e.response.data.error);
            else 
                callback(e.response.statusText);
        }
    }

    return editTodo;
}