import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

const Header = (props) => {
    const { setModalVisible } = useContext(AppContext);

    return (
        <div>
            <button onClick={() => setModalVisible(true)} >New</button>
            <select >
                <option value='All'>All</option>
                <option value='Complete'>Complete</option>
                <option value='Incomplete'>Incomplete</option>
            </select>
        </div>
    )
}

export default Header;