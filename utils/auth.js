import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  // 从cookie或Authorization头中获取token
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.split(" ")[1];

  // 如果token不存在，则返回401。
  if (!token) return res.status(401).json({ message: "用户未登录" });
  try {
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      // 如果token无效，则返回403。
      if (err) return res.status(403).json({ message: "token无效" });
      // 如果路径参数中的id与token中的id不相等，则返回403。
      if (req.params.userId && req.params.userId != userInfo.id)
        return res
          .status(403)
          .json({ message: "当前用户信息与token不匹配" });
      req.user = userInfo;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "服务器错误" });
  }
};

export default auth;
