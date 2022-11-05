import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get, post } from "../authService/authService";

import { LoadingContext } from "../contexts/load.context";

import ItemForm from "../components/ItemForm";
import SearchBar from "../components/SearchBar";
import Item from "../components/Item";
import { Link } from "react-router-dom";

const Items = () => {

    const { description, name, setDescription, setIsLoading, setMessage, setName, user } = useContext(LoadingContext);

    const [allItems, setAllItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const [name, setName] = useState('');
    // const [description, setDescription] = ('')
    
    const addItem = (newItem) => {
        setAllItems([...allItems, newItem])
    }

    const deleteItem = () => {
        // setMessage(`${item} has been removed from Items.`)
    }

    const handleSubmit = (e) => {
        console.log("Submitted")
        setIsLoading(true)
        e.preventDefault();
        const newItem = {
            name: name, 
            description: description,
            contributor: user._id
            }
        post("/items/add-item", newItem)
        .then((result) => {
            console.log(result.data)
            setIsLoading(false)
            addItem(newItem)
            setMessage(`${name} has been added to Items.`)
        })
        .catch((err) => {
            console.log(err.message)
            setMessage(err.message)
            setIsLoading(false)
        })
        .finally(() => {
            setName('');
            setDescription('');
        })
    }


    const filtered = !searchTerm
      ? allItems
      : allItems.filter((item) => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
      

    useEffect(() => {
        setDescription('');
        setName('');
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
                    <Link to={`/${user._id}/my-items`}>My Items</Link>
                    <ItemForm buttonName={'Add Item'} handleSubmit={handleSubmit} />
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