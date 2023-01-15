import React, { useContext, useRef } from 'react';
import AppContext from '../contexts/AppContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from 'axios';


const CreateOrEditModal = () => {
    const { showModal, 
            setShowModal, 
            todoList, 
            setTodoList, 
            editItem, 
            setEditItem,
            token } = useContext(AppContext);
    const input = useRef();

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
        axios({
            method: 'post',
            url: '/newtodo', 
            data: { 
                completed: false,
                text: input.current.value.trim(),
                // date: timestamp('MM/DD/YYYY  HH:mm')
            }, 
            headers: { Authorization: token }
        })
        .then(response => {
            console.log('new todo response: ', response.data); 
            setTodoList([response.data, ...todoList]);
        })
        .catch(e => console.log(e.response));
    }

    const EditTodo = () => {
        const newItem = {...editItem, body: input.current.value.trim()};
        setTodoList(todoList.map(item => item.id === editItem.id ? newItem : item));
        setEditItem(null);
    }

    const onClose = () => {
        if(editItem) setEditItem(null);
        setShowModal(false);
    }

    return (
      <Rodal 
        className='create-edit-modal'
        closeOnEsc={true} 
        animation='door'
        measure='' 
        onAnimationEnd={() => input.current.focus()} 
        visible={showModal} 
        onClose={onClose}
      >
        <form className='modal-form' onSubmit={handleSubmit}>
          <h2>{editItem ? 'Edit To Do:' : 'Add a To Do:'}</h2>
          <textarea className='modal-input' 
                    ref={input} 
                    autoFocus={true} 
                    name='input' 
                    defaultValue={editItem ? editItem.body : ''} 
                    required>
          </textarea>
          <div className='modal-button-container '>
            <button className='button modal-button' type='submit'>Done</button>
          </div>
        </form>
      </Rodal>
    )
  }

  export default CreateOrEditModal;