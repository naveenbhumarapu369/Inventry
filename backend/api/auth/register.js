const cors = require("cors");
const initMiddleware = require("../lib/initMiddleware");
const bcrypt = require("bcryptjs");
const { connectDB } = require("../lib/db");

const User = require("../models/User");

const corsMiddleware = initMiddleware(
  cors({
    origin: true,
    credentials: true,
  })
);

module.exports = async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fullName, email, password } = req.body;

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    return res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
};

