<<<<<<< HEAD
const cors = require("cors");
const initMiddleware = require("../../lib/initMiddleware");
const { connectDB } = require("../../lib/db");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const corsMiddleware = initMiddleware(
  cors({
    origin: true,
    credentials: true,
  })
);

module.exports = async function handler(req, res) {
  await corsMiddleware(req, res);

  const {
    query: { userId },
    method,
  } = req;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to change password",
      error: err.message,
    });
  }
};

=======
const cors = require("cors");
const initMiddleware = require("../../lib/initMiddleware");
const { connectDB } = require("../../lib/db");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const corsMiddleware = initMiddleware(
  cors({
    origin: true,
    credentials: true,
  })
);

module.exports = async function handler(req, res) {
  await corsMiddleware(req, res);

  const {
    query: { userId },
    method,
  } = req;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to change password",
      error: err.message,
    });
  }
};

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
