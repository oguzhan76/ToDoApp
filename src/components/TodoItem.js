import React, { useState, useContext } from "react";
import { ImPencil, ImBin2 } from 'react-icons/im';
import AppContext from "../contexts/AppContext";

const TodoItem = (props) => {
    const { handleDelete } = useContext(AppContext);
    const [item, setItem] = useState(props.item);
    const [ischecked, setIsChecked ] = useState(item.complete);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);

        // update database
    }

    return (
        <div className="list-row">
            <div className="list-row-item">
                <input type="checkbox" checked={ischecked} onChange={handleCheckboxChange}></input>
                <div>
                    <p style={{textDecoration: ischecked ? 'line-through' : 'none'}}>{item.body}</p>
                    <p className="list-row-item-date">{item.date}</p>
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