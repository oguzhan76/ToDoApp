import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

const Header = () => {
    const { setShowModal, setFilter, setSearchFilter } = useContext(AppContext);

    const handleDropdownChange = (e) => {
        setFilter(e.target.value);
        e.target.blur(); //takes focus away so that :hover works
    }

    return (
        <div className="header">
            <div className="top-buttons-container">
                <button className="new-button" onClick={() => setShowModal(true)} >New</button>
                <select className='dropdown' onChange={handleDropdownChange}>
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