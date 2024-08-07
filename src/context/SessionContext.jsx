import { useEffect, useState, createContext } from "react";

export const SessionContext = createContext({
    isLoggedIn: false,
    user: ""
});

export const ContextProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/current`, {
            credentials: 'include'
        }).then(
            response => response.json()
        ).then(
            data => {
                updateSession(data.isLogged, data.payload);
            }
        )
    }, []);

    const updateSession = (isLogged, user) => {
        setIsLoggedIn(isLogged);
        setUser(user);
    }

    return (
        <SessionContext.Provider value = {{isLoggedIn, user, updateSession}}>
            {children}
        </SessionContext.Provider>
    )
}