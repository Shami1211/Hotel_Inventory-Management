const express = require("express");
const router = express.Router();
const Drive = require("../Model/DiscountModel"); // Corrected path
const DiscountContoller = require("../Controllers/DiscountController");

router.get("/", DiscountContoller.getAllDiscounts);
router.get("/:id", DiscountContoller.getById);
router.post("/", DiscountContoller.addDiscount);
router.put("/:id", DiscountContoller.updateDiscount);
router.delete("/:id", DiscountContoller.deleteDiscount);
module.exports = router;
