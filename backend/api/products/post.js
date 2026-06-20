// Fallback for POST /api/products in case your Vercel routing expects method files.
// If Vercel uses function per path only, you can ignore this file.
const cors = require("cors");
const initMiddleware = require("../../lib/initMiddleware");
const Product = require("../../models/Product");

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
    const { productName, category, quantity, price, description } = req.body;

    const product = new Product({
      productName,
      category,
      quantity,
      price,
      description,
    });

    await product.save();

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to add product",
      error: err.message,
    });
  }
};

