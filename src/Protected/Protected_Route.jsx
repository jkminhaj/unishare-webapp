import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider.jsx";
import { Navigate, useLocation } from "react-router-dom";

const Protected_Route = ({children}) => {
    const { loading} = useContext(GlobalContext);
    const location = useLocation();   
    const user = localStorage.getItem("user");
    if(loading){
        return <div className="flex justify-center mt-16"><span className="loading loading-bars loading-lg mt-28 text-center"></span></div>
    }
    if(user){
        return children ;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default Protected_Route;