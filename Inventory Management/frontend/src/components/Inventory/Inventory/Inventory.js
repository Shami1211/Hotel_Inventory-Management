import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Inventory = (props) => {
  const navigate = useNavigate();
  const { _id, image, name, category, quantity, price, total, date } = props.inventory;
  const [editMode, setEditMode] = useState(false);
  const [editedInventory, setEditedInventory] = useState({
    image,
    name,
    category,
    quantity,
    price,
    total,
    date,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInventory((prevState) => ({
      ...prevState,
      [name]: value,
      total: name === 'quantity' ? editedInventory.price * value : editedInventory.quantity * value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/inventories/${_id}`, editedInventory);
      navigate('/inventories'); // Navigate to inventories page after successful update
    } catch (error) {
      console.error('Error updating inventory:', error);
      // Handle error and provide feedback to the user
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/inventories/${_id}`);
      navigate('/inventories'); // Navigate to inventories page after successful deletion
    } catch (error) {
      console.error('Error deleting inventory:', error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Image:</td>
            <td>{editMode ? <input type="text" name="image" value={editedInventory.image} onChange={handleChange} /> : image}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{editMode ? <input type="text" name="name" value={editedInventory.name} onChange={handleChange} /> : name}</td>
          </tr>
          <tr>
            <td>Category:</td>
            <td>{editMode ? <input type="text" name="category" value={editedInventory.category} onChange={handleChange} /> : category}</td>
          </tr>
          <tr>
            <td>Quantity:</td>
            <td>{editMode ? <input type="number" name="quantity" value={editedInventory.quantity} onChange={handleChange} /> : quantity}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>{editMode ? <input type="number" name="price" value={editedInventory.price} onChange={handleChange} /> : price}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>{editMode ? <input type="number" name="total" value={editedInventory.total} readOnly /> : total}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{editMode ? <input type="date" name="date" value={editedInventory.date} onChange={handleChange} /> : date}</td>
          </tr>
        </tbody>
      </table>
      {editMode ? (
        <>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Inventory;
