// app.js
const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const app = express();

// Routes
const ItemRouter = require("./Routes/ItemRoute");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/items", ItemRouter);

// DB connection
connectDB(app); // Pass the app instance to connectDB

// Start the server
const PORT = process.env.PORT || 5000; // Use port 5000 instead of 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
