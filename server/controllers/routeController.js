const { Order } = require("../models");

const groupByBorough = (orders) => {
  const grouped = {};

  for (const order of orders) {
    const type = order.borough;
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(order);
  }

  return grouped;
};

const optimizeRoutes = (grouped) => {
  const result = {};
  for (const type in grouped) {
    const orders = grouped[type];
    const batches = [];
    while (orders.length) {
      batches.push(orders.splice(0, 5));
    }
    result[type] = batches;
  }
  return result;
};

exports.getOptimizedRoutes = async (req, res) => {
  const orders = await Order.findAll({ where: { status: "PLACED" } });
  const grouped = groupByBorough(orders.map((o) => o.toJSON()));
  const optimized = optimizeRoutes(grouped);
  const alerts = [];

  for (const b in grouped) {
    if (grouped[b].length >= 10) {
      alerts.push(`${b} has ${grouped[b].length} unbatched orders.`);
    }
  }

  res.json({ optimized, alerts });
};
