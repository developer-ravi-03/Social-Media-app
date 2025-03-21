import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import { isAuth } from "./middlewares/isAuth.js";
import { Chat } from "./models/ChatModel.js";
import { User } from "./models/userModels.js";
//for socket.io
import { app, server } from "./socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";

// import axios from "axios";

//for reload website
// const url = `https://social-media-app-gkbm.onrender.com`;
// const interval = 30000;

// function reloadWebsite() {
//   axios
//     .get(url)
//     .then((response) => {
//       console.log(
//         `Reloaded at ${new Date().toISOString()}: Status Code ${
//           response.status
//         }`
//       );
//     })
//     .catch((error) => {
//       console.error(
//         `Error reloading at ${new Date().toISOString()}:`,
//         error.message
//       );
//     });
// }

// setInterval(reloadWebsite, interval);

//dot env
dotenv.config();

//cloudinary
cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

//because it comes from socket.js
// const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
// app.get("/", (req, res) => {
//   res.send("Server Working");
// });

// to get all chats of user
app.get("/api/messages/chats", isAuth, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    }).populate({
      path: "users",
      select: "name profilePic",
    });

    chats.forEach((e) => {
      e.users = e.users.filter(
        (user) => user._id.toString() !== req.user._id.toString()
      );
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// to get all users
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//importing routes
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

//using routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/messages", messageRoutes);

//for production
//for hosting on a platform
// const __dirname = path.resolve();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// app.use(express.static(path.join(__dirname, "./frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

//it commented because it also comes from socket.js
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
//   connectDb();
// });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
