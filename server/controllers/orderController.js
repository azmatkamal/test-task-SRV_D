const { Order } = require("../models");

exports.getAllOrders = async (req, res) => {
  const where = req.query.borough ? { borough: req.query.borough } : {};
  const orders = await Order.findAll({ where });
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ error: "Status is required" });
    return;
  }

  if (!["PLACED", "DISPATCHED"].includes(status.toUpperCase())) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  await Order.update({ status }, { where: { id } });

  const io = req.app.get("io");
  io.emit("order-updated"); // Notify clients

  res.json({ success: true });
};

exports.getOrderSummary = async (req, res) => {
  const orders = await Order.findAll();
  const summary = {
    total: orders.length,
    placed: orders.filter((o) => o.status === "PLACED").length,
    dispatched: orders.filter((o) => o.status === "DISPATCHED").length,
    boroughs: {},
  };
  orders.forEach((order) => {
    if (!summary.boroughs[order.borough]) {
      summary.boroughs[order.borough] = { placed: 0, dispatched: 0 };
    }
    summary.boroughs[order.borough][order.status.toLowerCase()] += 1;
  });
  res.json(summary);
};
