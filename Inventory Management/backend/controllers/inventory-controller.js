// inventory-controller.js
const Inventory = require("../model/Inventory");

const getAllInventories = async (req, res, next) => {
  let inventories;
  try {
    inventories = await Inventory.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!inventories || inventories.length === 0) {
    return res.status(404).json({ message: "No inventories found" });
  }

  return res.status(200).json({ inventories });
};

const getInventoryById = async (req, res, next) => {
  const id = req.params.id;
  let inventory;
  try {
    inventory = await Inventory.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!inventory) {
    return res.status(404).json({ message: "Inventory not found" });
  }

  return res.status(200).json({ inventory });
};

const addInventory = async (req, res, next) => {
  const { image, name, category, quantity, price, total, date } = req.body;
  const inventory = new Inventory({
    image,
    name,
    category,
    quantity,
    price,
    total,
    date,
  });

  try {
    await inventory.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  return res.status(201).json({ inventory });
};

module.exports = {
  getAllInventories,
  getInventoryById,
  addInventory,
};
