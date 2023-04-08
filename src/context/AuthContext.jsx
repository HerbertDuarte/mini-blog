import { createContext, useContext } from "react";

export const authContext = createContext()

export const AuthContextProvider = ({children, value}) =>{

  return(
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}

export const authValue = () =>{
  return useContext(authContext)
}