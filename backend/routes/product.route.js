import express from "express";
import {
  deleteProducts,
  getProducts,
  postProducts,
  updateProducts,
} from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", postProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
