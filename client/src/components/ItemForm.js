import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { post } from '../authService/authService';

const ItemForm = ({ addItem, buttonName, handleSubmit })=> {

    const { description, name, setDescription, setIsLoading, setMessage, setName, user } = useContext(AuthContext);

    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');


    const handleNameInput = (e) => {
      e.preventDefault()
      setName(e.target.value)
      // e.onChange(e.target.value)
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
    onSubmit={handleSubmit}
    >
      <p>Add New Item</p>

      <label>Name</label>
      <input 
      value={name} 
      type="text" onChange={(e)=>handleNameInput(e)} />

      <label>Description</label>
      <input 
      value={description} 
      type="text" onChange={handleDescriptionInput} />

      <button type="submit">{buttonName}</button>
    </form>
  );
}

export default ItemForm;