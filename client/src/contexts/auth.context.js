import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../authService/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();


    const authenticateUser = () => {
        const token = localStorage.getItem("authToken");
        
        setIsLoading(true);
     
        if (token) {
            get("/users/login-test")
                .then((results) => {
                    console.log("Are we logged in?", results.data);
                    setUser(results.data)
                
                })
                .catch((err) => {
                    localStorage.clear();
                    setIsLoading(false)
                    console.log(err.message);
                })
                .finally(() => {
                    setIsLoading(false)
                });
            } else {
                setIsLoading(false);
                setUser(null);
            }
    }

    const logout = () => {
        localStorage.clear();
        setMessage("You are logged out.");
        setUser(null);
        navigate("/");
      };


    useEffect(() => {
        authenticateUser();
      }, []);


    return (
        <AuthContext.Provider value={{ authenticateUser, isLoading, logout, message, user, setIsLoading, setMessage, setUser }}>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthContext, AuthProvider }