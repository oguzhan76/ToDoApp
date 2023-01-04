import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

const Header = () => {
    const { setShowModal, setFilter } = useContext(AppContext);

    return (
        <div>
            <button onClick={() => setShowModal(true)} >New</button>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value='all'>All</option>
                <option value='complete'>Complete</option>
                <option value='incomplete'>Incomplete</option>
            </select>
        </div>
    )
}

export default Header;