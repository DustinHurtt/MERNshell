import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../authService/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [item, setItem] = useState(null)

    const getItem = (id) => {

        // setIsLoading(true);
  
          get(`/items/${id}/this-item`)
          .then((results) => {
            console.log(results, "RESULTS");
            // setItem(results.data);
            // setName(results.data.name);
            // setDescription(results.data.description);
            // setIsLoading(false)
          })
          .catch((err) => {
            console.log(err, "THERE HAS BEEN AN ERROR");
            // setIsLoading(false)
          })
          .finally(() => {
            // setIsLoading(false)
          })
      }



    // useEffect(() => {

    //   }, []);


    return (
        <LoadingContext.Provider value={{ description, getItem, item, isLoading, message, name, user, setDescription, setIsLoading, setMessage, setName, setUser }}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }