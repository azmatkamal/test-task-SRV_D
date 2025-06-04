const express = require("express");
const router = express.Router();
const { getOptimizedRoutes } = require("../controllers/routeController");

router.get("/optimized", getOptimizedRoutes);

module.exports = router;
