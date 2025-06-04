const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  getOrderSummary,
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.get("/summary", getOrderSummary);
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
