import React, { useContext, useRef } from 'react';
import AppContext from '../contexts/AppContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import timestamp from "time-stamp";

const TodoModal = () => {
    const input = useRef();
    const { showModal, 
            setShowModal, 
            todoList, 
            setTodoList, 
            editItem, 
            setEditItem } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
            if(editItem)
                EditTodo();
            else
                CreateTodo();
        e.target.reset();
        setShowModal(false);
    }

    const CreateTodo = () => {
        const newTodo = { 
            complete: false,
            body: input.current.value.trim(),
            date: timestamp('MM/DD/YYYY HH:mm')
        }
        setTodoList([...todoList, newTodo]);        
    }

    const EditTodo = () => {
        const newItem = {...editItem, body: input.current.value.trim()};
        setTodoList(todoList.map(item => item === editItem ? newItem : item));
        setEditItem(null);
    }

    const onClose = () => {
        if(editItem) setEditItem(null);
        setShowModal(false);
    }

    return (
      <Rodal 
        closeOnEsc={true} 
        animation='door' 
        onAnimationEnd={() => input.current.focus()} 
        visible={showModal} 
        onClose={onClose}
      >
        <form className='modal-form' onSubmit={handleSubmit}>
          <h2>Add a To Do</h2>
          <textarea className='modal-input' ref={input} autoFocus={true} name='input' defaultValue={editItem ? editItem.body : ''} required></textarea>
          <div className='modal-button-container '>
            <button className='button modal-button' type='submit'>Done</button>
          </div>
        </form>
      </Rodal>
    )
  }

  export default TodoModal;