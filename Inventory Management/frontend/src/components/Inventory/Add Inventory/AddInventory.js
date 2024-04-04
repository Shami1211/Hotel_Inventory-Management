import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddInventory = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    image: '',
    name: '',
    category: '',
    quantity: '',
    price: '',
    total: '', // Total field added
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
      // Calculate total if price or quantity changes
      total: name === 'quantity' ? inputs.price * value : inputs.quantity * value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      await axios.post('http://localhost:5000/inventories/', inputs);
      navigate('/inventories'); // Navigate to inventories page after successful submission
    } catch (error) {
      console.error('Error submitting inventory:', error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <h2>Add Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" value={inputs.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={inputs.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={inputs.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={inputs.quantity} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={inputs.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Total:</label>
          <input type="number" name="total" value={inputs.total} onChange={handleChange} required readOnly />
          {/* Use readOnly to prevent manual input */}
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={inputs.date} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddInventory;
