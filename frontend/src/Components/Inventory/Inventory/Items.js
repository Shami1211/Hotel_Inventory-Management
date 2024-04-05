import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item"; // Assuming Item.js contains the item component
import { useNavigate } from "react-router";

const Items = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Items</h1>
      <div className="item-list">
        {items.map((item) => (
          <Item key={item._id} item={item} onDelete={() => handleDeleteItem(item._id)} />
        ))}
      </div>
    </div>
  );
};

export default Items;
