import express from "express";
import auth from "../utils/auth.js";
import {
  register,
  login,
  getUser,
  updateUser,
  logout,
  resetPassword,
  forgotPassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/reset-password/:userId", auth, resetPassword);
router.post("/forgot-password", forgotPassword);
router.get("/profile/:userId", auth, getUser);
router.put("/profile/:userId", auth, updateUser);

export default router;
