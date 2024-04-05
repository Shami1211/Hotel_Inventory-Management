// connect.js
const mongoose = require("mongoose");

const connectDB = async (app) => {
  try {
    await mongoose.connect("mongodb+srv://admin:jiCG8f44dLD88zfS@cluster0.evmm97r.mongodb.net/myDatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  }

  // Start the server after successfully connecting to the database
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

module.exports = connectDB;
