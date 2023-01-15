import React, { useState, useContext } from "react";
import { ImPencil, ImBin2 } from 'react-icons/im';
import AppContext from "../contexts/AppContext";
import useApiRequest from "../hooks/useApiRequest";

const TodoItem = ({ item }) => {
    const { todoList, setTodoList, setShowModal, setEditItem } = useContext(AppContext);
    const [ischecked, setIsChecked ] = useState(item.completed);
    const editTodo = useApiRequest();

    const handleCheckboxChange = () => {
        // setIsChecked((prev) => !prev);
        setEditItem(item); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // !isChecked -> becuase setischecked won't be effective until component rerenders
        // setTodoList(todoList.map((i) => i._id === item._id ? {...item, completed: !ischecked } : i ));
        editTodo({toggle: true}, (error) => {
            if(error)
                console.log(error);
        })
    }

    const handleEdit = () => {
        setEditItem(item);
        setShowModal(true);
    }

    const handleDelete = () => {
        setTodoList(todoList.filter(todo => item._id !== todo._id));
    }

    return (
        <div className="list-row">
            <div className="list-row-item">
                <input className="checkbox" type="checkbox" checked={ischecked} onChange={handleCheckboxChange}></input>
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