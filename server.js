import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import uploaderRouter from "./routes/uploader.js";

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

// 路由配置
app.use("/api/upload", uploaderRouter); // 文件上传路由
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
