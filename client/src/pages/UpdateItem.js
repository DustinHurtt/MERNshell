import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LoadingContext } from "../contexts/load.context";
import { get, post } from "../authService/authService";
import ItemForm from "../components/ItemForm";
import { AuthContext } from "../contexts/auth.context";

const UpdateItem = () => {

    // const [item, setItem] = useState(null)

    // const { user } = useContext(AuthContext)

    const navigate = useNavigate()


    const { 
      // description, name,
      user,
      setItem,
      items,
      setItems,
      setMyItems,
      myItems,
      getItem, item, 
      setDescription, setIsLoading, setName 
    } = useContext(LoadingContext);

    const params = useParams();

    let getIndex = (array, thisItem) => {
      console.log(array, thisItem, "What's happeing in getIndex()")
      return array.findIndex((element) => element._id === thisItem._id)
    }

    let updatedArray = (array, updatedItem) => {
      console.log(getIndex(array, updatedItem), "INDEX")
      array[(getIndex(array, updatedItem))] = updatedItem
      return array

      // return array.map(element => a)
      // return array.map((element, i) => 
      //   i === getIndex(array, updatedItem)
      //   ? {...element, updatedItem}
      //   : element
        
      // )
      console.log(getIndex(array, updatedItem), "Index position")
    }

    // arr1.map(obj => arr2.find(o => o.id === obj.id) || obj)

    // const updateShape = (shape, index) => {
    //   setTheArrayOfObjects(state => state.map((el, i) => i === index
    //     ? { ...el, shape }
    //     : el,
    //    ));
    // };
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
        post(`/items/${params.id}/update-item`, {
           item
        })
        .then((results) => {
          console.log(results.data, "this is the result")
          console.log(updatedArray(myItems, results.data), "updated My Items")
          console.log(updatedArray(items, results.data), "updated All Items")
          // setMyItems(updatedArray(myItems, results.data))
          // setItems(updatedArray(items, results.data))
          
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setItem({})
          console.log(item, "item after being added")
          console.log(items, "items after update")
          console.log(myItems, "myItems after update")
          // setDescription('')
          // setName('');
          navigate(`/${user._id}/my-items`)
        })
    }

    
 
    

    useEffect(() => {
      if (!item._id) {
        console.log(item, "No Item")
        get(`/items/${params.id}/this-item`)
          .then((results) => {
            console.log(results.data, "FROM GET ITEM")
            setItem(results.data)
          })
      }
    }, []) 


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
      user &&
      <div>
              <Link  
        // onClick={getMyItems} 
        to={`/${user._id}/my-items`}>My Items</Link>
        <h1>Update Item</h1>
        {/* {item && <ItemForm buttonName={'Update Item'} handleSubmit={submitUpdate} />}  */}
        <div>


        <ItemForm  buttonName={'Update Item'} handleSubmit={submitUpdate} />
        {/* <p>{item.name}</p> */}

        </div>
      </div>
    );
  };
  
  export default UpdateItem;