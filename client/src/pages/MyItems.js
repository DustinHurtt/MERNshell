import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { LoadingContext } from "../contexts/load.context";
import { get } from "../authService/authService";

import Item from "../components/Item";

const MyItems = () => {
  const { isLoading, setDescription, setIsLoading, setName, setMessage, setItems, items, setItem, myItems, setMyItems } = useContext(LoadingContext);

  const userPage = true;

  const params = useParams();
  const navigate = useNavigate();

  // const [myItems, setMyItems] = useState([]);

  const handleDelete = (id) => {
    const thisItem = myItems.find((item) => item._id === id)
    setItem(thisItem)
    console.log(thisItem, "This is the ITEM from the button")

    console.log(id, "TARGET")
    navigate(`/${id}/delete-item`)
  }


//   const thisItem = items.find((item) => item._id === params.id)
//   // }, [])
//   // const item 
//   useEffect(() => {
//     // if (!item) {
//     //   getItem(params.id)
//     console.log(thisItem, "THIS IS THE ITEM")
//     setItem(thisItem)
//     // } 

// console.log(items, "these are the items")

//     // else {
//     // setName(thisItem.name)
//     // setDescription(thisItem.description)
//   // }
//   }, [])
  const handleUpdate = (id) => {
    const thisItem = myItems.find((item) => item._id === id)
    setItem(thisItem)
    console.log(id, "TARGET")
    console.log(thisItem, "This is the ITEM from the button")
    // get(`/items/${id}/this-item`)
    // .then((results) => {
    //   console.log(results, "RESULTS");
    //   // setItem(results.data);
    //   setDescription(results.data.description);
    //   setName(results.data.name);
    //   // setIsLoading(false)
    // })
    // .catch((err) => {
    //   console.log(err, "THERE HAS BEEN AN ERROR");
    //   // setIsLoading(false)
    // })
    // .finally(() => {

      navigate(`/${id}/update-item`)
    // })
  }

  // const getItems = () => {
  //   // setIsLoading(!isLoading)
  //   !items &&
  //   get(`/items/${params.id}/my-items`)
  //     .then((results) => {
  //       console.log(results, "RESULTS");
  //       setMyItems(results.data.myItems);
  //       setItems(results.data.myItems);
  //       // setIsLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err, "THERE HAS BEEN AN ERROR");
  //       // setIsLoading(false)
  //     })
  //   .finally(() => {
  //     // setIsLoading(false)
  //   })
  //   // .then((results) => {
  //   //     // console.log(results.data.myItems, "Results")
  //   //     // setMyItems(results.data.myItems)
  //   //     setIsLoading(false)
  //   // })
  //   // .catch((err) => {
  //   //     setMessage(err)
  //   //     console.log(err)
  //   // })
  // };

  // useEffect(() => {
  //   // setIsLoading(!isLoading)
  //   //  getItems()
  //   // get(`/items/${params.id}/my-items`)
  //   // .then((results) => {
  //   //   console.log(results, "RESULTS");
  //   //   setMyItems(results.data.myItems);
  //   //   // setIsLoading(false)
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err, "THERE HAS BEEN AN ERROR");
  //   //   setIsLoading(false)
  //   // })
  //   // .finally(() => {
  //   //   setIsLoading(false)
  //   // })
  //   // .then((result) => {
  //   //   console.log(result)
  //   //   setIsLoading(false)
  //   // })
  //   // .catch(() => {
  //   //   setIsLoading(false)
  //   // });
  // }, []);

  useEffect(() => {
    //!myItems.length && 
    if(!items.length) {
    console.log("MY ITEMS NO LENGTH", myItems)
    setIsLoading(true)
    get(`/items/${params.id}/my-items`)
      .then((results) => {
        console.log(results.data.myItems, 'foundItems')
        setMyItems(results.data.myItems)
        
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })}
    // console.log(myItems, "No items")
  }, [])

  return (
    <div>
      <h2>My Items</h2>

        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
          {[...myItems].reverse().map((singleItem) => {
            return (
              <Item singleItem={singleItem} userPage={userPage} handleUpdate={() => handleUpdate(singleItem._id)} handleDelete={() => handleDelete(singleItem._id)}  />
              );
          })}         
        </table>

    </div>

    // {/* <div>
    //   <h2>My Items</h2>
    //   {!!items.length && (
    //     <table>
    //       <tr>
    //         <th>Name</th>
    //         <th>Description</th>
    //       </tr>
    //       {items.map((singleItem) => {
    //         return (
    //           <Item singleItem={singleItem} userPage={userPage} handleUpdate={() => handleUpdate(singleItem._id)} handleDelete={() => handleDelete(singleItem._id)}  />
    //           );
    //       })}         
    //     </table>
    //   )}
    // </div> */}
  );
};
  
  export default MyItems;