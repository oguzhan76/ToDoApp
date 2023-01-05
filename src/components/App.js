import React, { useEffect, useState} from "react";
import AppContext from "../contexts/AppContext";
import TodoModal from './TodoModal';
import TodoList from './TodoList';
import Header from "./Header";

const App = () => {
    const [ todoList, setTodoList ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ editItem, setEditItem ] = useState(null);
    const [ filter, setFilter ] = useState('all');

    // Get data from local storage when mounted.
    useEffect(() => {    
      console.log('Data is gotten from local storage');
      const data = JSON.parse(localStorage.getItem('todoList'));
      setTodoList(data || []);
    }, [])

    //write to storage
    useEffect(() => {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]) 
  
    return (
      <AppContext.Provider value={{ 
            showModal, 
            setShowModal, 
            editItem,
            setEditItem, 
            todoList, 
            setTodoList, 
            filter, 
            setFilter }}>
        <div className="app">
          <Header />
          <TodoList />
          <TodoModal />
        </div>
      </AppContext.Provider>
    )
}

export default App;