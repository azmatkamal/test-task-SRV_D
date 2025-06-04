const path = require("path");
module.exports = {
  config: path.resolve(__dirname, "config", "config.js"),
  "models-path": path.resolve(__dirname, "models"),
  "seeders-path": path.resolve(__dirname, "seeders"),
};
