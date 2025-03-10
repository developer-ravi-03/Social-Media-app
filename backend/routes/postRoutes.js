import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  commentonPost,
  deleteComment,
  deletePost,
  editCaption,
  getAllPosts,
  likeUnlikePost,
  newPost,
} from "../controllers/postController.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

//New post
router.post("/new", isAuth, uploadFile, newPost);

//delete post
router.delete("/:id", isAuth, deletePost);

//edit caption of post
router.put("/:id", isAuth, editCaption);

// fetch all post
router.get("/all", isAuth, getAllPosts);

// like and unlike post
router.post("/like/:id", isAuth, likeUnlikePost);

// comment on post
router.post("/comment/:id", isAuth, commentonPost);

// delete comment on post
router.delete("/comment/:id", isAuth, deleteComment);

export default router;
