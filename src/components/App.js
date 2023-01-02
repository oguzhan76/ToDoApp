import React, {useState} from "react";
import TodoModal from './TodoModal';
import TodoList from './TodoList';

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
      <div>
        <button onClick={() => setModalVisible(true)} >New</button>
        {'// dropdown sorting' }
        <TodoList list={todoList} handleDelete={handleDelete} />
        <TodoModal visible={modalVisible} setVisible={setModalVisible} handleAddToList={handleAddToList}/>
      </div>
    )
}

export default App;