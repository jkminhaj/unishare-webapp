import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);
const GlobalProvider = ({ children }) => {
    const [materialData, setMaterialData] = useState(null);
    const [user, setUser] = useState(false);
    
    // storing the material data in local
    useEffect(() => {
        if(materialData) localStorage.setItem("materialData", JSON.stringify(materialData));
    }, [materialData])

    // pass data in global context
    const data = { materialData, setMaterialData, user, setUser }
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;