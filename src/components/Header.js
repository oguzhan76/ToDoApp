import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

const Header = () => {
    const { setShowModal, setFilter, setSearchFilter } = useContext(AppContext);

    return (
        <div className="header">
            <div className="top-buttons-container">
                <button className="new-button" onClick={() => setShowModal(true)} >New</button>
                <select className='dropdown' onChange={(e) => setFilter(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='complete'>Complete</option>
                    <option value='incomplete'>Incomplete</option>
                </select>
            </div>    
            <input className="search-bar" type='text' placeholder='Search' onChange={(e) => setSearchFilter(e.target.value)}></input>

        </div>
    )
}

export default Header;