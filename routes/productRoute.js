import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteAllProduct,
  deleteAProduct,
} from "../controllers/product.js";

const router = express.Router();

// CRUD

// product 전체 불러오는 API
router.get("/", getProducts);

// 상세 프로덕트 불러오는 api
router.get("/:productID", protect, getProductByID);

router.post("/", createProduct);

router.put("/:productID", updateProduct);

router.delete("/", protect, admin, deleteAllProduct);

// 한개의 제품 삭제
router.delete("/:productID", protect, admin, deleteAProduct);

export default router;
