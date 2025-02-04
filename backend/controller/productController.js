import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch products" });
  }
};
export const postProducts = async (req, res) => {
  const post = req.body;
  if (!post.name || !post.price || !post.image) {
    return res.status(400).json({ message: "Provide all the details" });
  }

  const newProduct = new Product(post);

  try {
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Failed to add product" });
  }
};
export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update product" });
  }
};
export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Product not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete product" });
  }
};
