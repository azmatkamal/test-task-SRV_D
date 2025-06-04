const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./models");
const routes = require("./routes");
const ordersRoutes = require("./routes/orders");
const routeRoutes = require("./routes/routes");

dotenv.config();
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // for raw JSON
app.use(express.urlencoded({ extended: true })); // for form-urlencoded

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/orders", ordersRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api", routes);

app.set("io", io);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });

  socket.on("order-created", () => {
    io.emit("order-updated");
  });

  socket.on("order-updated", () => {
    io.emit("order-updated");
  });
});

const PORT = process.env.PORT || 5555;
server.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
