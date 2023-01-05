import React, { useContext, useMemo } from "react"
import TodoItem from "./TodoItem";
import AppContext from "../contexts/AppContext";

const TodoList = () => {
    const { filter, todoList } = useContext(AppContext);

    const filteredList = useMemo(() => {
        if (filter === 'all') return todoList;
  
        if (filter === 'complete') {
            return todoList.filter((item) => item.complete === true);
        }
        if (filter === 'incomplete') {
            return todoList.filter((item) => item.complete === false);
        }
    }, [filter, todoList]);

    return (
      <div className="todo-list">
        {filteredList && filteredList.map((i) => <TodoItem key={i.id} item={i} />)}
      </div>
    )
}

export default TodoList;