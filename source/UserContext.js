import { createContext,useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLogin = ()=>{
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, toggleLogin}}>
            {children}
        </AuthContext.Provider>
    )

}

