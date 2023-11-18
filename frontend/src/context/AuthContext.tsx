import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const localStorageObject = localStorage.getItem("token"); //gets token from localstorage
  const initialToken = localStorageObject ? JSON.parse(localStorageObject) : null;  //parses token
  const [token, setToken] = useState(initialToken || null); //token state

  const updateToken = (newToken: string | null) => {  //function for updating token
    setToken(newToken);
  };

  useEffect(() => { //sets token as JSON in localstorage when it changes
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return <AuthContext.Provider value={{ token, updateToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };