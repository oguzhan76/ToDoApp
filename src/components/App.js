import React, { useEffect, useRef, useState } from "react";
import AppContext from "../contexts/AppContext";
import CreateOrEditModal from './CreateOrEditModal';
import TodoList from './TodoList';
import Header from "./Header";

const App = () => {
    // check if we have an access_token yet

    // Get data from local storage when mounted.
    const loadList = () => {    
        console.log('Data is gotten from local storage');
        const data = JSON.parse(localStorage.getItem('todoList'));
        return data || [];
    }

    const [ todoList, setTodoList ] = useState(loadList);
    const [ showModal, setShowModal ] = useState(false);
    const [ editItem, setEditItem ] = useState(null);
    const [ filter, setFilter ] = useState('all');
    const [ searchFilter, setSearchFilter ] = useState('');
    const initializing = useRef(true);

    console.log('Rendering app');

    //write to storage
    useEffect(() => {
        // Using initializing state to prevent it to write when first mounted
        if(todoList === undefined || initializing.current === true) {
            initializing.current = false;
            return;
        }
        console.log('writing to localStorage', todoList);
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
            setFilter,
            searchFilter,
            setSearchFilter
         }}>
        <div className="app">
          <Header />
          <TodoList />
          <CreateOrEditModal />
        </div>
      </AppContext.Provider>
    )
}

export default App;