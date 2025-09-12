import { createContext, useEffect, useState } from "react";
import {app} from "../../firebase.config";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const GlobalContext = createContext(null);
const GlobalProvider = ({ children }) => {
    const [globalLoading , setGlobalLoading] = useState(false);
    const [user , setUser] = useState(null);
    // Authentication
    const auth = getAuth(app) ;
    const google_provider = new GoogleAuthProvider();
    const facebook_provider = new FacebookAuthProvider();

    const connect_google =()=>{
        setGlobalLoading(true);
        return signInWithPopup(auth , google_provider);
    }
    const connect_facebook =()=>{
        setGlobalLoading(true);
        return signInWithPopup(auth , facebook_provider);
    }
    const create_user =(email,password)=>{
        setGlobalLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const login_user =(email,password)=>{
        setGlobalLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const log_out =()=>{
        setGlobalLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        // holds the user
        const unsubscirbe = onAuthStateChanged(auth,currentUser=>{
            setGlobalLoading(true);
            setUser(currentUser);
            if(currentUser){
                // issue a token
                console.log(currentUser);
                setGlobalLoading(false);
            }else{
                // remove the token
                console.log("no user");
                setGlobalLoading(false);
            }
        });

        return ()=>{
            unsubscirbe();
        }

    },[])
        

    // pass data in global context
    const data = {  user , connect_facebook , globalLoading , setGlobalLoading , connect_google , create_user , login_user , log_out };
    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;