import express from "express";
import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getOrders,
  createOrder,
  myOrder,
  getOrderFromID,
} from "../controllers/order.js";

const router = express.Router();

// 전체 장바구니 가져오기 (admin)
router.get("/", protect, admin, getOrders);

router.post("/", protect, createOrder);

// 상세 장바구니(Only myself)
router.get("/myorder", protect, myOrder);

// orderID 기반으로 찾기 (admin)
router.get("/:orderID", protect, admin, getOrderFromID);

// 장바구니 업데이트
router.put(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    res.json({
      msg: "Update order",
    });
  })
);

// 장바구니 삭제
router.delete("/", (req, res) => {
  res.json({
    msg: "Delete order",
  });
});

router.put("/:id/pay", protect, updatePayStatus);

router.put("/:id/delivery", protect, admin, updateDeliveryStatus);

export default router;
