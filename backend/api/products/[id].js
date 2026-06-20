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

  const id = req.query?.id;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
    if (req.method === "PUT") {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    }

    if (req.method === "DELETE") {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        message: "Product deleted successfully",
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({
      message: "Operation failed",
      error: err.message,
    });
  }
};

