import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { get } from "../authService/authService";

import ConfirmPassword from "../components/ConfirmPassword";
import Item from "../components/Item";

const DeleteItem = () => {

    const [item, setItem] = useState({})

    const params = useParams()

    const getItem = () => {
        get(`/items/${params.id}/this-item`)
        .then((results) => {
          console.log(results, "RESULTS");
          setItem(results.data.item[0]);
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
      <div >
        <h1>Delete Item</h1>
        <table>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
        <Item singleItem={item} />
        </table>
        <ConfirmPassword />
      </div>
    );
  };
  
  export default DeleteItem;