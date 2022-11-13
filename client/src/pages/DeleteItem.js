import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { get, post } from "../authService/authService";

import { LoadingContext } from "../contexts/load.context";

import ConfirmPassword from "../components/ConfirmPassword";
import Item from "../components/Item";
import Password from "../components/Password";
import Modal from "../components/Modal";

const DeleteItem = () => {

    // const [item, setItem] = useState({})
    const [showModal, setShowModal] = useState(false)

    const { item, user, setMessage } = useContext(LoadingContext)

    const navigate = useNavigate()


    const params = useParams()

    const handleDelete = () => {
      setShowModal(!showModal)
      // e.preventDefault()
      // console.log(e, "this is E from deletete button")
      post(`/items/${item._id}/delete-item`)
        .then((result) => {
          setMessage(result.data.message)
          console.log(result, "DELETE RESULT")
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          navigate(`/${user._id}/my-items`)
        })
      console.log(item, "ITEM from Delete Item Button")
        
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
        {/* <form onSubmit={(e)=>{handleSubmit(e)}}>

          <Password />
          <ConfirmPassword />
          <button type="submit">Delete Item</button>

        </form> */}
        <button
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        Delete Item
      </button>
      <Modal
        buttonAction={"Delete"}
        showModal={showModal}
        handleSubmit={handleDelete}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <h3>Are you sure you would like to delete {item.name}?</h3>
      </Modal>
      </div>
    );
  };
  
  export default DeleteItem;