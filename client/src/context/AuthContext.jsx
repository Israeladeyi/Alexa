import { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const { session, setSession } = useState(undefined);
    //Signin new user
    
    const signupnewuser = asyc () => {
      const {data, error} = await supabase.auth.signup({
        email:email,
        password:password
      })
      if (error){
        
      }
    }
    
    
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
