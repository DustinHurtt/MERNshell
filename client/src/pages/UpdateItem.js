import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { get, post } from "../authService/authService";
import ItemForm from "../components/ItemForm";

const UpdateItem = () => {

    const [item, setItem] = useState(null)

    const { description, name, setDescription, setIsLoading, setName } = useContext(AuthContext);

    const params = useParams();

    const getItem = () => {

      // setIsLoading(true);

        get(`/items/${params.id}/this-item`)
        .then((results) => {
          console.log(results, "RESULTS");
          setItem(results.data);
          setName(results.data.name);
          setDescription(results.data.description);
          // setIsLoading(false)
        })
        .catch((err) => {
          console.log(err, "THERE HAS BEEN AN ERROR");
          // setIsLoading(false)
        })
        // .finally(() => {
        //   setIsLoading(false)
        // })
    }

    const submitUpdate = (e) => {
      e.preventDefault();
        post(`/items/${params.id}/update-item`, {
          name: name,
          description: description
        })
        .then((results) => {
          console.log(results)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setDescription('')
          setName('');
        })
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
      <div>
        <h1>Update Item</h1>
        {item && <ItemForm buttonName={'Update Item'} handleSubmit={submitUpdate} />} 

        {/* <p>{item.name}</p> */}
      </div>
    );
  };
  
  export default UpdateItem;