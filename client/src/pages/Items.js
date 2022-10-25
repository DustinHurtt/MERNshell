import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get, post } from "../authService/authService";

import AddItem from "../components/AddItem";
import SearchBar from "../components/SearchBar";

const Items = () => {

    const { setMessage, user } = useContext(AuthContext)

    const [allItems, setAllItems] = useState([])
    const [item, setItem] = useState({})
    
    const addItem = (item) => {
        setAllItems(...allItems, item)
    }

    const deleteItem = () => {
        setMessage(`${item} has been removed from Items.`)
    }

    useEffect(() => {
        get("/items", )
        .then((results) => {
            setAllItems(results.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (

        <div>
            <h1>This is the Items page.</h1>
            {user &&
            <AddItem addItem={addItem} setItem={setItem} />}
            <SearchBar />
            {allItems.length && 
                allItems.map((singleItem) => {
                    return (
                        <div>
                            <p>{singleItem.name}</p>
                            <p>{singleItem.description}</p>
                        </div>
                        )
                    })
            }
        </div>

    )

}

export default Items

//message: ${name} has been added to Items
//message: ${name} has been removed from Items