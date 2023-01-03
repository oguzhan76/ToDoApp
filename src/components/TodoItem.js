import React, { useState, useContext } from "react";
import { ImPencil, ImBin2 } from 'react-icons/im';
import AppContext from "../contexts/AppContext";

const TodoItem = (props) => {
    const { handleDelete } = useContext(AppContext);
    const [item, setItem] = useState(props.item);

    return (
        <div className="list-row">
            <div className="list-row-item">
                <input type="checkbox"></input>
                <div>
                    <p>{props.item.body}</p>
                    <p className="list-row-item-date">{props.item.date}</p>
                </div>
            </div>
            <div className="list-row-item">
                <button onClick={() => handleDelete(props.item)}><ImBin2 /></button>
                <button onClick={() => props.handleEdit(props.item)}><ImPencil /></button>
            </div>
        </div>
    )
}

export default TodoItem; 