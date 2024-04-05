const express = require("express");
const router = express.Router();
const Item = require("../Model/ItemModel"); // Corrected path to ItemModel
const ItemController = require("../Controllers/ItemController"); // Corrected controller import

router.get("/", ItemController.getAllItems);
router.get("/:id", ItemController.getItemById);
router.post("/", ItemController.addItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);
module.exports = router;
