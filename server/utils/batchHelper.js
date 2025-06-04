const { Order } = require("../models");

const groupByBorough = (orders) => {
  const grouped = {};
  for (const order of orders) {
    const borough = order.borough;
    if (!grouped[borough]) grouped[borough] = [];
    grouped[borough].push(order);
  }
  return grouped;
};

const optimizeRoutes = (grouped) => {
  const result = {};
  for (const borough in grouped) {
    const orders = [...grouped[borough]]; // shallow copy
    const batches = [];
    while (orders.length) {
      batches.push(orders.splice(0, 5)); // batch of 5
    }
    result[borough] = batches;
  }
  return result;
};

const getOptimizedBatchesAndAlerts = async () => {
  const orders = await Order.findAll({ where: { status: "PLACED" } });
  const grouped = groupByBorough(orders.map((o) => o.toJSON()));
  const optimized = optimizeRoutes(grouped);

  const alerts = [];
  for (const b in grouped) {
    if (grouped[b].length >= 10) {
      alerts.push(`${b} has ${grouped[b].length} unbatched orders.`);
    }
  }

  return { optimized, alerts };
};

module.exports = {
  groupByBorough,
  optimizeRoutes,
  getOptimizedBatchesAndAlerts,
};
