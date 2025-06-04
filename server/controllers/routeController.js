const { getOptimizedBatchesAndAlerts } = require("../utils/batchHelper");

exports.getOptimizedRoutes = async (req, res) => {
  try {
    const { optimized, alerts } = await getOptimizedBatchesAndAlerts();
    res.json({ optimized, alerts });
  } catch (err) {
    res.status(500).json({ error: "Failed to optimize routes" });
  }
};
