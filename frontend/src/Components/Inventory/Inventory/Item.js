import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Item = ({ item, onDelete }) => {
  const { _id, image, name, category, company, quantity, price, total, date } = item;

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/items/${_id}`);
        onDelete(_id); // Pass the deleted item ID to the parent component
        window.alert("Item deleted successfully!")
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item. Please try again.");
      }
    }
  };

  return (
    <div className="item">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Category: {category}</p>
      <p>Company: {company}</p>
      <p>Quantity: {quantity}</p>
      <p>Price: {price}</p>
      <p>Total: {total}</p>
      <p>Date: {date}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/items/update/${_id}`}> {/* Update the link */}
        <button>Update</button>
      </Link>
    </div>
  );
};

export default Item;
