// ../model/Inventory.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number }, // Remove required constraint for total
  date: { type: Date, required: true },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
