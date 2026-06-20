const cors = require("cors");
const initMiddleware = require("../lib/initMiddleware");
const { connectDB } = require("../lib/db");
const Product = require("../models/Product");

const corsMiddleware = initMiddleware(
  cors({
    origin: true,
    credentials: true,
  })
);

module.exports = async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

