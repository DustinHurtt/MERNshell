const Item = ({ singleItem,  handleDelete, handleUpdate, userPage }) => {
  return (
    <tr>
        <td>{singleItem.name}</td>
        <td>{singleItem.description}</td>
        {userPage && <td><button onClick={handleUpdate}>Update</button></td>}
        {userPage && <td><button onClick={handleDelete}>Delete</button></td>}
    </tr>
  );
};

export default Item;