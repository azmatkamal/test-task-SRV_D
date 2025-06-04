const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  getOrderSummary,
  createOrder,
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.get("/summary", getOrderSummary);
router.patch("/:id/status", updateOrderStatus);
router.post("/", createOrder);

module.exports = router;
