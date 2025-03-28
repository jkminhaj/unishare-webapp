import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
const GlobalProvider = ({children}) => {
    const [materialData , setMaterialData] = useState({});
    const [user ,setUser] = useState(null);

    // pass data in global context
    const data = { materialData , setMaterialData , user , setUser}
    return (
        <GlobalContext.Provider value = {data}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;