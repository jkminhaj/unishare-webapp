import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider.jsx";
import { Navigate, useLocation } from "react-router-dom";

const Protected_Route = ({children}) => {
    const { globalLoading } = useContext(GlobalContext);
    const location = useLocation();   
    const user = localStorage.getItem("user");
    const fullPath = location.hash || location.pathname
    if(globalLoading){
        return <div className="flex justify-center mt-16"><span className="loading loading-spinner text-blue-500 loading-lg mt-28 text-center"></span></div>
    }
    if(user){
        return children ;
    }
    return <Navigate state={{ from: fullPath }} replace  to='/login'></Navigate>
};

export default Protected_Route;