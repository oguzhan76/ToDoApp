import React from "react";

const TodoItem = (props) => {
    return (
        <div className="list-row">
            <div className="list-row-item">
                <input type="checkbox"></input>
                <p>{props.item.body}</p>
            </div>
            <div className="list-row-item">
                <p className="list-row-item-date">{props.item.date}</p>
                <button onClick={() => props.handleDelete(props.item)}>Del</button>
            </div>
        </div>
    )
}

export default TodoItem; 