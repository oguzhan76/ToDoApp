import React from "react"
import TodoItem from "./TodoItem";

const TodoList = (props) => {
    return (
      <div>
        {props.list.map((i) => <TodoItem key={i.body} item={i} handleDelete={props.handleDelete} />)}
      </div>
    )
}

export default TodoList;