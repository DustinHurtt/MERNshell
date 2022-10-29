import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../authService/authService";

const UpdateItem = () => {

    const [item, setItem] = useState({})
    

    const params = useParams()

    const getItem = () => {
        get(`/items/${params.id}/this-item`)
        .then((results) => {
          console.log(results, "RESULTS");
          setItem(results.data);
          // setIsLoading(false)
        })
        .catch((err) => {
          console.log(err, "THERE HAS BEEN AN ERROR");
        });
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
      <div>
        <h1>Update Item</h1>
        {/* <form>
          <label>Name</label>
          <input value={name} type="text" onChange={handleNameInput} />

          <label>Description</label>
          <input value={description} type="text" onChange={handleDescriptionInput}/>
        </form> */}
        {/* make Item form component re-useable between pages */}
        <p>{item.name}</p>
      </div>
    );
  };
  
  export default UpdateItem;