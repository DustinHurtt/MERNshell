import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get, post } from "../authService/authService";

const Items = () => {

    const { setMessage } = useContext(AuthContext)

    const [allItems, setAllItems] = useState([])
    const [item, setItem] = useState({})
    
    const addItem = () => {
        setMessage(`${item} has been added to Items.`)
    }

    const deleteItem = () => {
        setMessage(`${item} has been removed from Items.`)
    }

    useEffect(() => {
        get("/items", )
    }, [])

    return (

        <div>
            <h1>This is the Items page.</h1>
            {allItems & 
                allItems.map((singleItem) => {
                    return <p>{singleItem}</p>
            })
            }
        </div>

    )

}

export default Items

//message: ${name} has been added to Items
//message: ${name} has been removed from Items