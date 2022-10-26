import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get } from "../authService/authService";

const MyItems = () => {

  const { user, setIsLoading, setMessage } = useContext(AuthContext)

  const [myItems, setMyItems] = useState([])

    useEffect(() => {
      setIsLoading(true)
      console.log(user._id, "THIS IS USER ID")
      // get(`/items/${user._id}/my-items`, )
      // .then((results) => {
      //     console.log(results.data.myItems, "Results")
      //     setMyItems(results.data.myItems)
      //     setIsLoading(false)
      // })
      // .catch((err) => {
      //     setMessage(err)
      //     console.log(err)
      // })
    }, [])

    return (
      
      <div>
      {!!myItems.length && myItems.map((item) => {
          return (
          
            <div>

              <p>{item.name}</p>
              <p>{item.description}</p>

            </div>
          )

      })
      
      
      }
        </div>
    );
  };
  
  export default MyItems;