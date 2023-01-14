import React, { useContext, useMemo } from "react"
import TodoItem from "./TodoItem";
import AppContext from "../contexts/AppContext";

const TodoList = () => {
    const { filter, todoList, searchFilter } = useContext(AppContext);

    const filteredList = useMemo(() => {
        if (!todoList) return [];

        const checkSearch = (item) => item.body.toLowerCase().includes(searchFilter.toLowerCase());

        if (filter === 'all') 
            return todoList.filter((item) => checkSearch(item));
  
        if (filter === 'complete') 
            return todoList.filter((item) => item.complete === true && checkSearch(item));
        
        if (filter === 'incomplete')
            return todoList.filter((item) => item.complete === false && checkSearch(item));
        
    }, [filter, todoList, searchFilter]);

    return (
      <div className="todo-list">
        {filteredList && filteredList.map((i) => <TodoItem key={i.id} item={i} />)}
      </div>
    )
}

export default TodoList;