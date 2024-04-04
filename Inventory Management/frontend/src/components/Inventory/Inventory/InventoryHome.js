// BudgetHome.js
import React from 'react';
import { Link } from 'react-router-dom';

const InventoryHome = () => {
  return (
    <div>
      <h2>Welcome to Budget Home Page</h2>
      <div>
        <Link to="/addinventory">
          <button>Add New </button>
        </Link>
      </div>
      <div>
        <Link to="/inventries">
          <button>View the Inventory Details</button>
        </Link>
      </div>
    </div>
  );
};

export default InventoryHome;
