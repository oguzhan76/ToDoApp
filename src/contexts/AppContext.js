import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppProvider = ({children}) => {
    const [ showModal, setShowModal ] = useState(false);
    const [ editItem, setEditItem ] = useState(null);
    const [ todoList, setTodoList ] = useState([]);
    const [ filter, setFilter ] = useState('all');
    const [ searchFilter, setSearchFilter ] = useState('');
    const [ token, setToken ] = useState();

    return (
        <AppContext.Provider value={{
            showModal, 
            setShowModal, 
            editItem,
            setEditItem, 
            todoList, 
            setTodoList, 
            filter, 
            setFilter,
            searchFilter,
            setSearchFilter,
            token,
            setToken
        }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContext;