import React, { useState, useRef } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';


const TodoModal = (props) => {

  const close = () => {
    props.setVisible(false);
  }

  const handleNewTodo = (e) => {
    e.preventDefault();
    console.log(e.target.elements.input.value);
    close();
  }

  return (
    <Rodal animation='door' visible={props.visible} onClose={close}>
      <form onSubmit={handleNewTodo}>
        <h1>Add a To Do</h1>
        <input autoFocus name='input'></input>  
      </form>
    </Rodal>
  )
}

const TodoList = () => {
  return (
    <div>
    </div>
  )
}


const Dashboard = () => {
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <div>
      <button onClick={() => setModalVisible(true)} >New</button>
      {'// dropdown sorting' }
      <TodoList />
      <TodoModal visible={modalVisible} setVisible={setModalVisible}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
