const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
const jadwalRoutes = require("./routes/jadwalRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
// app.use("/api/notifications", notificationRoutes);
app.use("/api/jadwal", jadwalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));