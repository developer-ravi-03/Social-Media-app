import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "Unauthorized" });

    const decodeData = jwt.verify(token, process.env.JWT_SEC);

    if (!decodeData)
      return res.status(400).json({
        message: "Token Expired",
      });

    req.user = await User.findById(decodeData.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Please Login",
    });
  }
};
