import React, { useState} from "react";
import AppContext from "../contexts/AppContext";
import TodoModal from './TodoModal';
import TodoList from './TodoList';
import Header from "./Header";

const App = () => {
    const [ todoList, setTodoList ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ filter, setFilter ] = useState('all');

    const handleDelete = (todo) => {
        console.log('deleted', todo.body);
    }
  
    return (
      <AppContext.Provider value={{ showModal, setShowModal, todoList, setTodoList, handleDelete, filter, setFilter }}>
        <Header />
        <TodoList />
        <TodoModal />
      </AppContext.Provider>
    )
}

export default App;