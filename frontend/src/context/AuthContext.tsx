import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const localStorageObject = localStorage.getItem("token");
    const initialToken = localStorageObject ? JSON.parse(localStorageObject) : null;
    const [token, setToken] = useState(initialToken || null);

    const updateToken = (newToken: string | null) => {
        setToken(newToken);
    };

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [token]);

    return <AuthContext.Provider value={{ token, updateToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };