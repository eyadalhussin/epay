import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJmcmFua0BrdW5kZS5kZSIsImlhdCI6MTcwOTQ4MjEzNywiZXhwIjoxNzA5NTY4NTM3fQ.dXtxOcz0FeQJi0o_ZuMr6A3eeDoJvAY9QxU9B1_O0cmQLIqhWc1h9bQJGh34t8qz';
        setAuthToken(token);
    }, []);

    return(
        <AuthContext.Provider value={{authToken, setAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
