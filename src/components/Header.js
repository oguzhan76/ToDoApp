import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import {FiLogOut} from 'react-icons/fi';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();
    const { token, setShowModal, setFilter, setSearchFilter } = useContext(AppContext);
    const [ showDialog, setShowDialog ] = useState(false);

    const handleDropdownChange = (e) => {
        setFilter(e.target.value);
        e.target.blur(); //takes focus away so that :hover works
    }

    const handleLogout = () => {
        console.log('logging out with ',token);
        axios.get('/logout', { headers: { Authorization: token } })
        .then(response => {
            if(response.data.logout)
                navigate('/login');
        })
        .catch(e => console.log(e.message));
    }

    return (
        <div className="header">
            <div className="top-buttons-container">
                <button className="new-button" onClick={() => setShowModal(true)} >New</button>
                <div className="header-right-group">
                    <select className='dropdown' onChange={handleDropdownChange}>
                        <option value='all'>All</option>
                        <option value='complete'>Complete</option>
                        <option value='incomplete'>Incomplete</option>
                    </select>
                    <button className="logout-button login-button" onClick={() => setShowDialog(true)}><FiLogOut /></button>
                </div>
            </div>    
            <input className="search-bar" type='text' placeholder='Search' onChange={(e) => setSearchFilter(e.target.value)}></input>
            
            <Rodal
                className='logout-dialog'
                closeOnEsc={true} 
                animation='door'
                measure='' 
                visible={showDialog} 
                onClose={() => setShowDialog(false)}
            >
            <div>
                <p>Are you sure?</p>
                <div className="logout-dialog__buttons">
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={() => setShowDialog(false)}>Cancel</button>
                </div>
            </div>
            </Rodal>
        </div>
    )
}

export default Header;