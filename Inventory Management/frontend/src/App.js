// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddInventory from './components/Inventory/Add Inventory/AddInventory'; // Updated import path
import Inventories from './components/Inventory/Inventory/Inventory'; // Updated import path
import InventoryHome from './components/Inventory/Inventory/InventoryHome'; // Assuming this is correctly named

function App() {
  return (
    <div >
      <Router>
        <Routes>
          
          {/* Inventory Routes */}
          <Route exact path="/" element={<InventoryHome />} />
          <Route exact path="/addinventory" element={<AddInventory />} />
          <Route exact path="/inventories" element={<Inventories />} /> {/* Corrected path */}
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
