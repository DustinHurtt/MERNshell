const Item = ({ singleItem }) => {
  return (
    <tr>
        <td>{singleItem.name}</td>
        <td>{singleItem.description}</td>
    </tr>
  );
};

export default Item;