import { React, createContext, useContext, useEffect, useState } from "react"

const TokenContext = createContext();

export const useToken = () => {
    return useContext(TokenContext);
}

export const TokenProvider = ({children}) => {

    const [customer1Token, setCustomer1Token] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('customer1Token');
        if(storedToken){
            setCustomer1Token(storedToken);
        } else {
            const customer1newToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJmcmFua0BrdW5kZS5kZSIsImlhdCI6MTcwOTQ4MjEzNywiZXhwIjoxNzA5NTY4NTM3fQ.dXtxOcz0FeQJi0o_ZuMr6A3eeDoJvAY9QxU9B1_O0cmQLIqhWc1h9bQJGh34t8qz';
            setCustomer1Token(customer1newToken);
            localStorage.setItem('customer1Token', customer1newToken);
        }
    }, [])

    return (
        <TokenContext.Provider value={customer1Token}>
            {children}
        </TokenContext.Provider>
    )

}