import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { get } from "../authService/authService";

import { LoadingContext } from "../contexts/load.context";

import ConfirmPassword from "../components/ConfirmPassword";
import Item from "../components/Item";
import Password from "../components/Password";

const DeleteItem = () => {

    // const [item, setItem] = useState({})

    const { item, user } = useContext(LoadingContext)


    const params = useParams()

    const handleSubmit = (id) => {
    
    }

    // const getItem = () => {
    //     get(`/items/${params.id}/this-item`)
    //     .then((results) => {
    //       console.log(results, "RESULTS");
    //       setItem(results.data.item[0]);
    //       // setIsLoading(false)
    //     })
    //     .catch((err) => {
    //       console.log(err, "THERE HAS BEEN AN ERROR");
    //     });
    // }

    // useEffect(() => {
    //     getItem()
    // }, [])

    return (
      <div >
        <Link  
        // onClick={getMyItems} 
        to={`/${user._id}/my-items`}>My Items</Link>
        <h1>Delete Item</h1>
        <table>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
        <Item 
        singleItem={item} 

        />
        </table>
        <form onSubmit={handleSubmit}>

          <Password />
          <ConfirmPassword />
          <button type="submit">Delete Item</button>

        </form>
      </div>
    );
  };
  
  export default DeleteItem;