import React, { useState, useContext } from "react";
import { ImPencil, ImBin2 } from 'react-icons/im';
import AppContext from "../contexts/AppContext";

const TodoItem = ({ item }) => {
    const { todoList, setTodoList, setShowModal, setEditItem } = useContext(AppContext);
    const [ischecked, setIsChecked ] = useState(item.complete);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        item.complete = !ischecked; // ! becuase setischecked won't be effective until component rerenders
        setTodoList(todoList.map((i) => i.body === item.body ? item : i ));
        // setTodoList([...todoList]);
    }

    const handleEdit = () => {
        setEditItem(item);
        setShowModal(true);
    }

    const handleDelete = () => {
        setTodoList(todoList.filter(todo => item.body !== todo.body));
    }

    return (
        <div className="list-row">
            <div className="list-row-item">
                <input type="checkbox" checked={ischecked} onChange={handleCheckboxChange}></input>
                <div>
                    <p style={{textDecoration: item.complete ? 'line-through' : 'none'}}>{item.body}</p>
                    <p className="list-row-item-date">{item.date}</p>
                </div>
            </div>
            <div className="list-row-item">
                <button onClick={() => handleDelete(item)}><ImBin2 /></button>
                <button onClick={() => handleEdit(item)}><ImPencil /></button>
            </div>
        </div>
    )
}

export default TodoItem; 