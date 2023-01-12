import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import {FiLogOut} from 'react-icons/fi';
import axios from "axios";

const Header = () => {
    const { token, setShowModal, setFilter, setSearchFilter } = useContext(AppContext);

    const handleDropdownChange = (e) => {
        setFilter(e.target.value);
        e.target.blur(); //takes focus away so that :hover works
    }

    const handleLogout = () => {
        axios({
            method: 'get',
            url: '/logout',
            headers: { Authorization: token }
        })
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
                    <button className="logout-button login-button" onClick={handleLogout}><FiLogOut /></button>
                </div>
            </div>    
            <input className="search-bar" type='text' placeholder='Search' onChange={(e) => setSearchFilter(e.target.value)}></input>

        </div>
    )
}

export default Header;