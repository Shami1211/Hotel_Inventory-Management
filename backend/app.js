const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Routes
const ItemRouter = require("./Routes/ItemRoute"); // Updated route import

// Middleware
app.use(express.json());
app.use(cors());
app.use("/items", ItemRouter); // Updated route path

// DB connection
mongoose
  .connect("mongodb+srv://admin:jiCG8f44dLD88zfS@cluster0.evmm97r.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
