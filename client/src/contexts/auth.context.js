import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../authService/authService"
import { LoadingContext } from "./load.context";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const { verifiedToken, setVerifiedToken, setIsLoading, setUser, setMessage} = useContext(LoadingContext)

    // const [isLoading, setIsLoading] = useState(false);
    // const [user, setUser] = useState(null);
    // const [message, setMessage] = useState('');
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');


    const navigate = useNavigate();


    const authenticateUser = () => {
        const token = localStorage.getItem("authToken");
        
        setIsLoading(true);
     
        if (token) {
            get("/users/login-test")
                .then((results) => {
                    console.log("Are we logged in?", results.data);
                    setUser(results.data)
                    if (!verifiedToken) {
                    setVerifiedToken(token)
                        }
                })
                .catch((err) => {
                    localStorage.clear();
                    setVerifiedToken(null)
                    setIsLoading(false)
                    console.log(err.message);
                })
                .finally(() => {
                    setIsLoading(false)
                });
            } else {

                setIsLoading(false);
                setUser(null);
                setVerifiedToken(null)
            }
    }

    const logout = () => {
        localStorage.clear();
        setMessage("You are logged out.");
        setUser(null);
        setVerifiedToken(null)
        navigate("/");
      };


    useEffect(() => {
        authenticateUser();
      }, []);


    return (
        <AuthContext.Provider value={{ authenticateUser, 
        // description, isLoading, 
        logout
        // , message, name, user, setDescription, setIsLoading, setMessage, setName, setUser 
        }}>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthContext, AuthProvider }