
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//Routers

const invetory_router = require("./routes/inventory-routes");

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/inventories", invetory_router); // localhost:5000/posts


//5knLkTrtbu1yqFpR
mongoose
  .connect(
    "mongodb+srv://admin:jiCG8f44dLD88zfS@cluster0.evmm97r.mongodb.net/"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  }) 
  .catch((err) => console.log(err));

