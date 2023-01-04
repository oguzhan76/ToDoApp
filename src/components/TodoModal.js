import React, { useContext, useRef, useState } from 'react';
import AppContext from '../contexts/AppContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import timestamp from "time-stamp";

const TodoModal = () => {
    const input = useRef();
    const { showModal, setShowModal, todoList, setTodoList } = useContext(AppContext);

    const handleCreate = (e) => {
        e.preventDefault();
        console.log(input.current.value);
        const newTodo = { 
            complete: false,
            body: input.current.value.trim(),
            date: timestamp('MM/DD/YYYY HH:mm')
        }

        setTodoList([...todoList, newTodo]);
        e.target.reset();
        setShowModal(false);
    }

    return (
      <Rodal 
        closeOnEsc={true} 
        animation='door' 
        onAnimationEnd={() => input.current.focus()} 
        visible={showModal} 
        onClose={() => setShowModal(false)}
      >
        <form className='modal-form' onSubmit={handleCreate}>
          <h1>Add a To Do</h1>
          <textarea className='modal-input' ref={input} autoFocus={true} name='input' required></textarea>
          <div className='modal-button-container '>
            <button className='button modal-button' type='submit'>Done</button>
          </div>
        </form>
      </Rodal>
    )
  }

  export default TodoModal;