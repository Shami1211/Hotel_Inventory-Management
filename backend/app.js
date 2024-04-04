const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgadgnjdfvd225()55757hbbhg77ffrtgfrtrftrftrft745{}[[]99b";

//Route
const ButgetRouter = require("./Routes/BudgetRoute");
const DriveRouter = require("./Routes/DriveRoute");
const DiscountRouter = require("./Routes/DiscountRoute");
const PostRoute = require("./Routes/PostRoute");
//Middleware
app.use(express.json());
app.use(cors());
app.use("/butget", ButgetRouter);
app.use("/drive", DriveRouter);
app.use("/discounts", DiscountRouter);
app.use("/postdb", PostRoute);
//db connection
mongoose
  .connect("mongodb+srv://admin:5knLkTrtbu1yqFpR@budget.jslcg3f.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// Register model
require("./Model/RegisterModel");
const User = mongoose.model("RegisterUser");

// Multer setup
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/Components/Register/uploads"); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });

// Register route
app.post("/register", upload.single("profileImage"), async (req, res) => {
  const { fullname, username, gmail, password, age, phone, bio, about } =
    req.body;
  let profileImage = "";
  const encryptedPassword = await bcrypt.hash(password, 10);

  if (req.file) {
    profileImage = req.file.path;
  }

  try {
    const oldUser = await User.findOne({ gmail });
    if (oldUser) {
      return res.send({ err: "user exists" });
    }
    const newUser = new User({
      fullname,
      username,
      gmail,
      password: encryptedPassword,
      age,
      phone,
      profileImage,
      bio,
      about,
    });
    // Save the new user document to the database
    await newUser.save();
    res.send({ status: "ok" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send({ error: "Failed to register user" });
  }
});
//login
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // User authenticated, generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/userdeta", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    User.findById(userId)
      .then((user) => {
        if (user) {
          // Construct the profile photo path
          const profilePhotoPath = `uploads/${user.profileImage}`;

          // Add profile photo path to the user data
          const userDataWithPhoto = { ...user.toJSON(), profilePhotoPath };

          // Send the response with user data and profile photo path
          res.status(200).json({ status: "ok", data: userDataWithPhoto });
        } else {
          res.status(404).json({ status: "error", data: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ status: "error", data: err.message });
      });
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: "error", data: "Invalid token" });
  }
});
