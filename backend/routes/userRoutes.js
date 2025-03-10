import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  followAndUnfollowUser,
  myProfile,
  updatePassword,
  updateProfile,
  userFollowersandFollowingData,
  userProfile,
} from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

//user profile
router.get("/me", isAuth, myProfile);

//see profile
router.get("/:id", isAuth, userProfile);

//update password
router.post("/:id", isAuth, updatePassword);

// update profile
router.put("/:id", isAuth, uploadFile, updateProfile);

//follow and unfollow
router.post("/follow/:id", isAuth, followAndUnfollowUser);

//followers and following detail
router.get("/followdata/:id", isAuth, userFollowersandFollowingData);

export default router;
