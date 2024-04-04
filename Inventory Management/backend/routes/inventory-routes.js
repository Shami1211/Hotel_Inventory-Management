// inventory-router.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

router.get("/", inventoryController.getAllInventories);
router.post("/", inventoryController.addInventory);
router.get("/:id", inventoryController.getInventoryById);
// router.put("/:id", inventoryController.updateInventory);
// router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
