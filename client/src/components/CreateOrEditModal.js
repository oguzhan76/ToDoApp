import React, { useContext, useRef } from 'react';
import AppContext from '../contexts/AppContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import useApiRequest from '../hooks/useApiRequest';


const CreateOrEditModal = () => {
    const { showModal, 
            setShowModal, 
            editItem, 
            setEditItem } = useContext(AppContext);
    const input = useRef();

    const {requestEdit, requestNew } = useApiRequest();



    const handleSubmit = (e) => {
        e.preventDefault();
            if(editItem) {
                requestEdit(editItem, {text: input.current.value.trim(), toggle: false}, () => {
                    setEditItem(null);
                });
            } else {
                requestNew({ text: input.current.value.trim()});
            }
        e.target.reset();
        setShowModal(false);
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