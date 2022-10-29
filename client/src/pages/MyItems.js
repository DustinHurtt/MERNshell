import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { get } from "../authService/authService";

import Item from "../components/Item";

const MyItems = () => {
  const { setIsLoading, setMessage } = useContext(AuthContext);

  const userPage = true;

  const params = useParams();
  const navigate = useNavigate();

  const [myItems, setMyItems] = useState([]);

  const handleDelete = (id) => {
    console.log(id, "TARGET")
    navigate(`/${id}/delete-item`)
  }

  const handleUpdate = (id) => {
    console.log(id, "TARGET")
    navigate(`/${id}/update-item`)
  }

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
          </tr>
          {myItems.map((singleItem) => {
            return (
              <Item singleItem={singleItem} userPage={userPage} handleUpdate={() => handleUpdate(singleItem._id)} handleDelete={() => handleDelete(singleItem._id)}  />
              );
          })}         
        </table>
      )}
    </div>
  );
};
  
  export default MyItems;