import express from "express";
// multer是一个Node.js中间件，用于处理文件上传。
// 用来处理文件上传并将文件保存到指定的目录中。
import multer from "multer";

const router = express.Router();

// 配置multer中间件，用于处理文件上传
// multer.diskStorage()方法用于设置文件存储的目的地和文件名。
const picStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/uploadPics"); // 设置上传文件的存储路径
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const picUploader = multer({ storage: picStorage });

// upload.single("file")表示只允许上传一个文件，并且前端提交时的name属性为file。
router.post(
  "/",
  picUploader.single("file"),
  (err, req, res, next) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "上传失败" });
    }
    next();
  },
  (req, res) => {
    const file = req.file;
    res.status(200).json({ uploadFilename: file.filename });
  }
);

export default router;
