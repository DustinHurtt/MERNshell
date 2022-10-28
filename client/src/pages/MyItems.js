import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { get } from "../authService/authService";

import Item from "../components/Item";

const MyItems = () => {
  const { setIsLoading, setMessage } = useContext(AuthContext);

  const params = useParams();

  const [myItems, setMyItems] = useState([]);

  const getItems = () => {
    // setIsLoading(true)
    get(`/items/${params.id}/my-items`)
      .then((results) => {
        console.log(results, "RESULTS");
        setMyItems(results.data.myItems);
        // setIsLoading(false)
      })
      .catch((err) => {
        console.log(err, "THERE HAS BEEN AN ERROR");
      });
    // .finally(() => {
    //   setIsLoading(false)
    // })
    // .then((results) => {
    //     // console.log(results.data.myItems, "Results")
    //     // setMyItems(results.data.myItems)
    //     setIsLoading(false)
    // })
    // .catch((err) => {
    //     setMessage(err)
    //     console.log(err)
    // })
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <h2>My Items</h2>
      {!!myItems.length && (
        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
          {myItems.map((singleItem) => {
            return (
              <Item singleItem={singleItem} />
              );
          })}

              {/* <td><button>Remove Item</button></td> */}
          
        </table>
      )}
    </div>
  );
};
  
  export default MyItems;