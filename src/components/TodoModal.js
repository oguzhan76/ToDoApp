import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import timestamp from "time-stamp";

const TodoModal = (props) => {

    const close = () => {
        props.setVisible(false);
    }
  
    const handleCreate = (e) => {
        e.preventDefault();
        const newTodo = { 
            complete: false,
            body: e.target.elements.input.value,
            date: timestamp('MM/DD/YYYY HH:mm')
        }
        props.handleAddToList(newTodo);
        e.target.reset();
        close();
    }
  
    return (
      <Rodal closeOnEsc={true} animation='door' visible={props.visible} onClose={close}>
        <form onSubmit={handleCreate}>
          <h1>Add a To Do</h1>
          <input autoFocus name='input'></input>  
        </form>
      </Rodal>
    )
  }

  export default TodoModal;