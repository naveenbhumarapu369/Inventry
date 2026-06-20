<<<<<<< HEAD
// Fallback for PUT /api/products/:id in case your Vercel routing expects method files.
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

  const id = req.query?.id;

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
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
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

=======
// Fallback for PUT /api/products/:id in case your Vercel routing expects method files.
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

  const id = req.query?.id;

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
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
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
