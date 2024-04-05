import React from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./Components/Inventory/AddItem/AddItem";
import UpdateItem from "./Components/Inventory/UpdateItem/UpdateItem";
import Items from "./Components/Inventory/Inventory/Items";
import Item from "./Components/Inventory/Inventory/Item";

function App() {
  return (
    <div>
      {/* Your sidebar component here */}
      <Routes>
        <Route path="/" element={<AddItem />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<Item />} />
        <Route path="/items/update/:id" element={<UpdateItem />} />
      </Routes>
    </div>
  );
}

export default App;
