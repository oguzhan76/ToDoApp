import React, { useContext, useRef } from 'react';
import AppContext from '../contexts/AppContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from 'axios';
import useApiRequest from '../hooks/useApiRequest';


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

    const editTodo = useApiRequest();

    const CreateTodo = () => {
        axios({
            method: 'post',
            url: '/newtodo', 
            data: { 
                text: input.current.value.trim()
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
        editTodo({text: input.current.value.trim(), toggle: false}, (error) => {
            if(!error)
                setEditItem(null);
            else
                console.log(error);
        });

        // axios({ 
        //     method: 'patch', 
        //     url: `/edit/${editItem._id}`, 
        //     data: { text: input.current.value.trim() }, 
        //     headers: { Authorization: token }
        // })
        // .then(response => {
        //     if(response.status === 200) {
        //         console.log('buraya mi giriyorsun');
        //         console.log(response.data);
        //         setTodoList(todoList.map(item => item._id === editItem._id ? response.data : item));
        //         getList();
        //         setEditItem(null); // kalacak
        //     }
        // })
        // .catch(e => {
        //     if(e.response.data)
        //         console.log(e.response.data.error);
        //     else
        //         console.log(e.response.statusText);
        //     // console.log(todoList);
        // });

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
                    defaultValue={editItem ? editItem.text : ''} 
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