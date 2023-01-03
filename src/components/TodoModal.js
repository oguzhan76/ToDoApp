import React, { useContext, useRef } from 'react';
import AppContext from '../contexts/AppContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import timestamp from "time-stamp";

const TodoModal = (props) => {
    const input = useRef();
    const { modalVisible, setModalVisible, handleAddToList } = useContext(AppContext);

    const handleCreate = (e) => {
        e.preventDefault();
        console.log(input.current.value);
        const newTodo = { 
            complete: false,
            body: input.current.value,
            date: timestamp('MM/DD/YYYY HH:mm')
        }
        handleAddToList(newTodo);
        e.target.reset();
        setModalVisible(false);
    }
  
    return (
      <Rodal 
        closeOnEsc={true} 
        animation='door' 
        onAnimationEnd={() => input.current.focus()} 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
      >
        <form className='modal-form' onSubmit={handleCreate}>
          <h1>Add a To Do</h1>
          <textarea className='modal-input' ref={input} autoFocus={true} name='input' required></textarea>
          <br />  
          <div className='modal-button-container '>
            <button className='button modal-button' type='submit'>Done</button>
          </div>
        </form>
      </Rodal>
    )
  }

  export default TodoModal;