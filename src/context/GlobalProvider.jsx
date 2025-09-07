import { createContext, useEffect, useState } from "react";
import {app} from "../../firebase.config";
import { getAuth } from "firebase/auth";
export const GlobalContext = createContext(null);
const GlobalProvider = ({ children }) => {
    const user = localStorage.getItem("user") ;
    const auth = getAuth(app) ;
    
    // pass data in global context
    const data = {  user }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;