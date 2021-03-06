import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(404);
    throw new Error("Not Authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin === "Admin") {
    next();
  } else {
    res.status(408);
    throw new Error("Not Authorized as an admin");
  }
};

export { protect, admin };
