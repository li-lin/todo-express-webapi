import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
// multer是一个Node.js中间件，用于处理文件上传。在这个上下文中，它被用来处理文件上传并将文件保存到指定的目录中。
import multer from "multer";

import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:3300", // 允许的请求源，即前端项目的域名。
    methods: ["GET", "POST", "PUT", "DELETE"], // 允许的请求方法。
    credentials: true, // 允许跨域请求携带凭证信息（cookie）。
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// 配置multer中间件，用于处理文件上传
// multer.diskStorage()方法用于设置文件存储的目的地和文件名。
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/uploadPics");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
// upload.single("file")表示只允许上传一个文件，并且前端提交时的name属性为file。
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    res.status(200).json({ uploadFilename: file.filename });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "上传失败" });
  }
});

// 路由配置
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
