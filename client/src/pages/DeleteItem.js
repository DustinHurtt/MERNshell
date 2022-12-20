import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { get, post } from "../authService/authService";

import { LoadingContext } from "../contexts/load.context";

import Item from "../components/Item";
import Modal from "../components/Modal";

const DeleteItem = () => {

    const params = useParams()

    // const [showModal, setShowModal] = useState(false)

    const { showModal, setShowModal, item, items, setItem, user, myItems, setItems, setMyItems, setMessage, setIsLoading, setTimedMessage } = useContext(LoadingContext)

    const navigate = useNavigate()

    const handleDelete = () => {

      setShowModal(!showModal)
      setIsLoading(true)

      post(`/items/${item._id}/delete-item`)
        .then((result) => {
          // setMessage(result.data.message)
          setTimedMessage(result.data.message, 3000)
          console.log(result, "DELETE RESULT")
          setMyItems(myItems.filter((item) => item._id !== result.data.item._id))
          setItems(items.filter((item) => item._id !== result.data.item._id))
          console.log("My Items after delete", myItems.filter((item) => item._id !== result.data.item._id) )
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          navigate(`/${user._id}/my-items`)
        })
      console.log(item, "ITEM from Delete Item Button")
        
    }

    useEffect(() => {
      if (!item._id) {
        setIsLoading(true)
        console.log(item, "No Item")
        get(`/items/${params.id}/this-item`)
          .then((results) => {
            console.log(results.data, "FROM GET ITEM")
            setItem(results.data)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    }, []) 


    return (

      user &&
      <div >
        <Link to={`/${user._id}/my-items`}>My Items</Link>
        <h1>Delete Item</h1>
        <table>
          <tr>
              <th>Name</th>
              <th>Description</th>
          </tr>
          <Item singleItem={item} />
        </table>

        <button onClick={() => {setShowModal(!showModal)}}>
        Delete Item
        </button>
      <Modal
        buttonAction={"Delete"}
        showModal={showModal}
        handleSubmit={handleDelete}
        closeModal={() => {
          setShowModal(false);
        }}>
        <h3>Are you sure you would like to delete {item.name}?</h3>
      </Modal>
      </div>
    );
  };
  
  export default DeleteItem;