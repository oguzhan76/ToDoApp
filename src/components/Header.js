import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

const Header = () => {
    const { setShowModal, setFilter } = useContext(AppContext);

    return (
        <div className="header">
            <button className="new-button" onClick={() => setShowModal(true)} >New</button>
            <select className='dropdown' onChange={(e) => setFilter(e.target.value)}>
                <option value='all'>All</option>
                <option value='complete'>Complete</option>
                <option value='incomplete'>Incomplete</option>
            </select>
        </div>
    )
}

export default Header;