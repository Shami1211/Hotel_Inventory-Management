import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateItem() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() =>  {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setInputs(response.data.item);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Recalculate total whenever quantity or price changes
    if (name === 'quantity' || name === 'price') {
      calculateTotal({ ...inputs, [name]: value });
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
      // Form validation
      if (inputs.quantity <= 0 || inputs.price <= 0) {
        setError('Quantity and price must be positive numbers.');
        return;
      }
      setError(''); // Clear any previous error

      await axios.put(`http://localhost:5000/items/${id}`, inputs);
      alert("Item details updated successfully!");
      navigate("/items"); // Navigate to the desired route
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Image URL:</label>
        <input type="text" name="image" value={inputs.image} onChange={handleChange} />
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
        <button type="submit">Update</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default UpdateItem;
