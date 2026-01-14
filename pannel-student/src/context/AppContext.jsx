import { createContext, useState, useEffect } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

    //     useEffect(() => {
    //     const handleStorageChange = () => {
    //       const newToken = localStorage.getItem("token") || "";
    //       setToken(newToken);
    //     };
    //     window.addEventListener("storage", handleStorageChange);
    //     return () => window.removeEventListener("storage", handleStorageChange);
    //   }, []);

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const value = {
        backend_url,
        token,
        setToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider