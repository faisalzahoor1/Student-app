import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [stData, setstData] = useState(() => {
        // Load student data from localStorage if it exists
        const saved = localStorage.getItem('stData');
        return saved ? JSON.parse(saved) : {};
    });


    //     useEffect(() => {
    //     const handleStorageChange = () => {
    //       const newToken = localStorage.getItem("token") || "";
    //       setToken(newToken);
    //     };
    //     window.addEventListener("storage", handleStorageChange);
    //     return () => window.removeEventListener("storage", handleStorageChange);
    //   }, []);

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : '');
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/student/get-student', { headers: { token }, params: { email } })
            console.log("hello1")
            if (data.success) {
                setstData(data.studentData)
                console.log(data.studentData)
                navigate('/show');
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("hello2")
            console.log(error)
        }
    }

    useEffect(() => {
        if (email) localStorage.setItem('email', email);
    }, [email]);
    useEffect(() => {
        if (stData && stData.name) {
            localStorage.setItem('stData', JSON.stringify(stData));
        }
    }, [stData]);

    const value = {
        backend_url,
        token,
        setToken,
        setstData,
        stData,
        getData,
        setEmail, email
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider