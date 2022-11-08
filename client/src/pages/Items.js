import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get, post } from "../authService/authService";

import { LoadingContext } from "../contexts/load.context";

import ItemForm from "../components/ItemForm";
import SearchBar from "../components/SearchBar";
import Item from "../components/Item";
import { Link } from "react-router-dom";

const Items = () => {

    const { items, setMyItems, verifiedToken, description, name, setDescription, setIsLoading, setMessage, setName, user, setItems, item, setItem } = useContext(LoadingContext);

    const [allItems, setAllItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const [name, setName] = useState('');
    // const [description, setDescription] = ('')
    
    const addItem = (newItem) => {
        setItems([...items, newItem])
    }

    const deleteItem = () => {
        // setMessage(`${item} has been removed from Items.`)
    }

    const handleSubmit = (e) => {
        console.log("Submitted")
        setIsLoading(true)
        e.preventDefault();
        const newItem = {
            ...item, 
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

    const getMyItems = (() => {
        console.log('getting my items')
        console.log(items, "All items when getting my Items")
        const myItems = items.filter((item => item.contributor.includes(user._id)))
        setMyItems(myItems)
        console.log(myItems, "these are my Items")
    })


    const filtered = !searchTerm
      ? items
      : items.filter((item) => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
      

    useEffect(() => {
        console.log(user, "this is the user")
        console.log(verifiedToken, "this is the verified token")
        console.log(allItems, "these are all items when coming back to page")
        console.log(item, "this is the item when coming back to the page")
        // setDescription('');
        // setName('');
        setItem({...item, name: "", description: "", contributor: ""})

  if(!items.length) {  
        setIsLoading(true)  
        get("/items")
        .then((results) => {
            setItems(results.data.items)
            console.log(results.data.items, "These are all items")
        })
        .catch((err) => {
            setMessage(err)
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }
    }, [])

    return (

        <div>
            <h1>This is the Items page.</h1>

            {user &&
                <div>
                    <Link  onClick={getMyItems} to={`/${user._id}/my-items`}>My Items</Link>
                    <ItemForm 
                    // item={item} 
                    buttonName={'Add Item'} handleSubmit={handleSubmit} />
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