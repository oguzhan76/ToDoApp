import React, { useContext } from "react";
import { ImPencil, ImBin2 } from 'react-icons/im';
import AppContext from "../contexts/AppContext";
import useApiRequest from '../hooks/useApiRequest';

const TodoItem = ({ item }) => {
    const { setShowModal, setEditItem } = useContext(AppContext);
    const { requestEdit, requestDelete } = useApiRequest();

    const handleCheckboxChange = () => {
        requestEdit(item, {toggle: true});
    }

    const handleEdit = () => {
        setEditItem(item);
        setShowModal(true);
    }

    const handleDelete = () => {
        // setTodoList(todoList.filter(todo => item._id !== todo._id));
        requestDelete(item._id);
    }

    return (
        <div className={`list-row ${item.completed ? "completed" : ""}`}>
            <div className="list-row-item">
                <input className="checkbox" type="checkbox" checked={item.completed} onChange={handleCheckboxChange}></input>
                <div>
                    <p style={{textDecoration: item.completed ? 'line-through 0.3rem' : 'none' }}>{item.text}</p>
                    <p className="list-row-item-date">{item.date}</p>
                </div>
            </div>
            <div className="list-row-item">
                <button onClick={() => handleEdit(item)}><ImPencil /></button>
                <button onClick={() => handleDelete(item)}><ImBin2 /></button>
            </div>
        </div>
    )
}

export default TodoItem; 