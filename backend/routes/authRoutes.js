import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

//register user routes
router.post("/register", uploadFile, registerUser);

//login user routes
router.post("/login", loginUser);

//logout user routes
router.get("/logout", logoutUser);

export default router;
