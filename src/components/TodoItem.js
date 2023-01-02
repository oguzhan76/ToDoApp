import React from "react";

const TodoItem = (props) => {
    return (
        <div>
            <p>{props.item.body}</p>
            <p>{props.item.date}</p>
            <button onClick={() => props.handleDelete(props.item)}>Del</button>
        </div>
    )
}

export default TodoItem; 