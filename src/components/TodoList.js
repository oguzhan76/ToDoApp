import React, { useContext } from "react"
import TodoItem from "./TodoItem";
import AppContext from "../contexts/AppContext";

const TodoList = (props) => {
    const { todoList } = useContext(AppContext);

    const filterList = (filter) => {
        if (filter === 'all') return todoList;

        if (filter === 'complete') {
            return todoList.filter((item) => item.complete === true);
        }
        if (filter === 'incomplete') {
            return todoList.filter((item) => item.complete === false);
        }
    }

    return (
      <div className="todo-list">
        {filterList('all').map((i) => <TodoItem key={i.body} item={i} />)}
      </div>
    )
}

export default TodoList;