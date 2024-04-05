import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddItem() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    image: '',
    name: '',
    category: '',
    company: '',
    quantity: 0,
    price: 0,
    total: 0,
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Recalculate total whenever quantity or price changes
    if (name === 'quantity' || name === 'price') {
      calculateTotal({ ...inputs, [name]: value }); // Pass updated inputs object
    }
  };

  const calculateTotal = ({ price, quantity }) => {
    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity);
    if (!isNaN(priceValue) && !isNaN(quantityValue)) {
      const total = priceValue * quantityValue;
      setInputs((prevState) => ({
        ...prevState,
        total: total.toFixed(2), // Round to 2 decimal places
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/items/', inputs);
      alert('Item Added Successfully');
      navigate('/items');
    } catch (error) {
      console.error('Error adding item:', error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Image URL:</label>
        <input type="text" name="image" value={inputs.image} onChange={handleChange} required />
        <br />
        <label>Name:</label>
        <input type="text" name="name" value={inputs.name} onChange={handleChange} required />
        <br />
        <label>Category:</label>
        <input type="text" name="category" value={inputs.category} onChange={handleChange} required />
        <br />
        <label>Company:</label>
        <input type="text" name="company" value={inputs.company} onChange={handleChange} required />
        <br />
        <label>Quantity:</label>
        <input type="number" name="quantity" value={inputs.quantity} onChange={handleChange} required />
        <br />
        <label>Price:</label>
        <input type="number" name="price" value={inputs.price} onChange={handleChange} required />
        <br />
        <label>Total:</label>
        <input type="text" name="total" value={inputs.total} readOnly />
        <br />
        <label>Date:</label>
        <input type="date" name="date" value={inputs.date} onChange={handleChange} required />
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
