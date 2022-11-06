import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { LoadingContext } from '../contexts/load.context';
import { post } from '../authService/authService';
import Input from './Input';

const ItemForm = ({ addItem, buttonName, handleSubmit
  // , item 
})=> {

    const { description, 
      item, 
      name, setItem, setDescription, setIsLoading, setMessage, setName, user } = useContext(LoadingContext);

    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');


    const handleChange = (e) => {
      // e.preventDefault()
      setItem((recent) => ({ ...recent, [e.target.name]: e.target.value}))
      // setTimeout(() => { 
      //   console.log(e.target.value, "THISSA")
      //   setName(e.target.value) 
      // }, 300)
      // e.onChange(e.target.value)
      console.log(item, "This is item as it changes")
    }

    

    const handleDescriptionInput = (e) => setDescription(e.target.value)

    // const handleSubmit = (e) => {
    //     setIsLoading(true)
    //     e.preventDefault();
    //     const newItem = {
    //         name: name, 
    //         description: description,
    //         contributor: user._id
    //         }
    //     post("/items/add-item", newItem)
    //     .then((result) => {
    //         console.log(result.data)
    //         setIsLoading(false)
    //         addItem(newItem)
    //         setMessage(`${name} has been added to Items.`)
    //     })
    //     .catch((err) => {
    //         console.log(err.message)
    //         setMessage(err.message)
    //         setIsLoading(false)
    //     })
    //     .finally(() => {
    //         setName('');
    //         setDescription('');
    //     })
    // }

  return (
    <form 
    key="item form"
    onSubmit={handleSubmit}
    >
      <p>Add New Item</p>

      <label>Name</label>
      <Input key={'name'} name={"name"} value={item.name} onChange={handleChange} />
      {/* <input 

      key="name"
      name="name"
      value={item.name} 
      type="text" onChange={handleChange} /> */}

      <label>Description</label>
      <Input key={'description'} name={"description"} value={item.description} onChange={handleChange}/>
      {/* <input

      key="description"
      name="description" 
      value={item.description} 
      type="text" onChange={handleChange} /> */}

      <button type="submit">{buttonName}</button>
    </form>
  );
}

export default ItemForm;