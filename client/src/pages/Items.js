import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get } from "../authService/authService";

import AddItem from "../components/AddItem";
import SearchBar from "../components/SearchBar";
import Item from "../components/Item";
import { Link } from "react-router-dom";

const Items = () => {

    const { setMessage, user } = useContext(AuthContext)

    const [allItems, setAllItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    const addItem = (newItem) => {
        setAllItems([...allItems, newItem])
    }

    const deleteItem = () => {
        // setMessage(`${item} has been removed from Items.`)
    }

    const filtered = !searchTerm
      ? allItems
      : allItems.filter((item) => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
      

    useEffect(() => {
        get("/items", )
        .then((results) => {
            setAllItems(results.data.items)
        })
        .catch((err) => {
            setMessage(err)
            console.log(err)
        })
    }, [])

    return (

        <div>
            <h1>This is the Items page.</h1>
            
            {user &&
                <div>
                    <Link to='/my-items'>My Items</Link>
                    <AddItem addItem={addItem} />
                </div>
            }

            <SearchBar setSearchTerm={setSearchTerm} />

            {!!filtered.length && 
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    {filtered.map((singleItem) => {
                        return (
                                <Item singleItem={singleItem} />
                            )
                        })}
                </table>
            }
        </div>

    )

}

export default Items

//message: ${name} has been added to Items
//message: ${name} has been removed from Items