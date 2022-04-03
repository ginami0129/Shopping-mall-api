import express from "express";

import User from "../models/userModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  loginUser,
  registerUser,
  updateUser,
  updateUserOnlyAdmin,
  getProfile,
} from "../controllers/user.js";

const router = express.Router();

// Login, Sign up, Profile

router.post("/", registerUser);

router.post("/login", loginUser);
// 프로필 불러오기(로그인 한 사람)
router.get("/", protect, getProfile);

router.put("/", protect, updateUser);

router.put("/:userid", protect, admin, updateUserOnlyAdmin);

export default router;
