import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../contexts/load.context";
import { get, post } from "../authService/authService";
import ItemForm from "../components/ItemForm";
import { AuthContext } from "../contexts/auth.context";

const UpdateItem = () => {

    // const [item, setItem] = useState(null)

    // const { user } = useContext(AuthContext)


    const { 
      // description, name,
      user,
      setItem,
      items,
      getItem, item, 
      setDescription, setIsLoading, setName 
    } = useContext(LoadingContext);

    const params = useParams();

    // const getItem = () => {

    //   setIsLoading(true);

    //     get(`/items/${params.id}/this-item`)
    //     .then((results) => {
    //       console.log(results, "RESULTS");
    //       setItem(results.data);
    //       setName(results.data.name);
    //       setDescription(results.data.description);
    //       // setIsLoading(false)
    //     })
    //     .catch((err) => {
    //       console.log(err, "THERE HAS BEEN AN ERROR");
    //       setIsLoading(false)
    //     })
    //     .finally(() => {
    //       setIsLoading(false)
    //     })
    // }

    const submitUpdate = (e) => {
      e.preventDefault();
        // post(`/items/${params.id}/update-item`, {
        //   name: name,
        //   description: description
        // })
        // .then((results) => {
        //   console.log(results)
        // })
        // .catch((err) => {
        //   console.log(err)
        // })
        // .finally(() => {
        //   setDescription('')
        //   setName('');
        // })
    }

    
 
    

    // useEffect(() => {
    //   if (!item) {
    //     getItem(params.id)
    //   } 


    //   else {
      //   setName(item.name)
      //   setDescription(item.description)}
//       const thisItem = items.find((item) => item._id === params.id)
//     // }, [])
//     // const item 
//     useEffect(() => {
//       // if (!item) {
//       //   getItem(params.id)
//       console.log(thisItem, "THIS IS THE ITEM")
//       setItem(thisItem)
//       // } 

// console.log(items, "these are the items")

//       // else {
//       // setName(thisItem.name)
//       // setDescription(thisItem.description)
//     // }
//     }, [])

    return (
      <div>
        <h1>Update Item</h1>
        {/* {item && <ItemForm buttonName={'Update Item'} handleSubmit={submitUpdate} />}  */}
        <div>

        {user &&
        <ItemForm  buttonName={'Update Item'} handleSubmit={submitUpdate} />}
        {/* <p>{item.name}</p> */}

        </div>
      </div>
    );
  };
  
  export default UpdateItem;