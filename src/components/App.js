import React, {useState} from "react";
import AppContext from "../contexts/AppContext";
import TodoModal from './TodoModal';
import TodoList from './TodoList';
import Header from "./Header";

const App = () => {
    const [ todoList, setTodoList ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);
  
    const handleAddToList = (newTodo) => {
        // TODO: handover to modal with context api
        console.log('handle on dashboard', newTodo);
        setTodoList([...todoList, newTodo]);
    }

    const handleDelete = (todo) => {
        console.log('deleted', todo.body);
    }
  
    return (
      <AppContext.Provider value={{modalVisible, setModalVisible, todoList, setTodoList, handleDelete}}>
        <Header />
        <TodoList />
        <TodoModal visible={modalVisible} setVisible={setModalVisible} handleAddToList={handleAddToList} type={'new'}/>
      </AppContext.Provider>
    )
}

export default App;