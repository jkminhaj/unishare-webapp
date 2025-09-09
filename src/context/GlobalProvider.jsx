import { createContext, useEffect, useState } from "react";
import {app} from "../../firebase.config";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const GlobalContext = createContext(null);
const GlobalProvider = ({ children }) => {
    const user = localStorage.getItem("user") ;
    const [globalLoading , setGlobalLoading] = useState(false);
    // const [user , setUser] = useState(null);
    // Authentication
    const auth = getAuth(app) ;
    const google_provider = new GoogleAuthProvider();
    const facebook_provider = new FacebookAuthProvider();

    const connect_google =()=>{
        return signInWithPopup(auth , google_provider);
    }
    const connect_facebook =()=>{
        return signInWithPopup(auth , facebook_provider);
    }
    const create_user =(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const login_user =(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const log_out =()=>{
        return signOut();
    }

    // useEffect(()=>{
    //     // holds the user
    //     const unsubscirbe = onAuthStateChanged(auth,currentUser=>{
    //         // setUser(currentUser);
    //         setGlobalLoading(true);
    //         if(currentUser){
    //             // issue a token
    //             console.log(currentUser);
    //         }else{
    //             // remove the token
    //         }
    //     });

    //     return ()=>{
    //         unsubscirbe();
    //     }

    // },[])
        

    // pass data in global context
    const data = {  user , connect_facebook , connect_google , create_user , login_user , log_out };
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;