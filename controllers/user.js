import { User } from "../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    const salt = bcrypt.genSaltSync(10); // 生成随机盐值，用于加密密码。
    // 盐值是一个随机字符串，用于增加密码的复杂性和安全性。
    const hashedPassword = bcrypt.hashSync(password, salt); // 使用盐值加密密码。

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
    });
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "用户注册失败" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "用户名或密码错误" });
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "用户名或密码错误" });
    }
    // 登录成功后，通过当前用户id和secretkey生成token，并将token作为cookie发送给客户端。
    const token = jwt.sign({ id: user.id }, "secretkey");
    // 设置cookie属性，httpOnly防止客户端脚本访问，sameSite和secure确保安全。
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(201)
      .json({
        user: {
          id: user.id,
          username: user.username,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none", // 设置SameSite属性为None，允许跨站点请求携带cookie。
      secure: true, // 设置Secure属性为true，确保cookie只能通过HTTPS传输。
      httpOnly: true, // 设置HttpOnly属性为true，防止客户端脚本访问cookie。
    })
    .status(201)
    .json({ message: "已退出登录" });
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "用户不存在" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "密码重置成功" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "密码重置失败" });
  }
};

export const forgotPassword = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "用户不存在" });
    if (user.email !== email)
      return res.status(404).json({ message: "邮箱不匹配" });
    // 生成随机新密码，将新密码通过邮件发送给用户。
    // 由于需要使用邮件发送功能，此处省略。采用将新密码通过响应形式返回。
    let newPassword = generateRandomPassword();
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);
    await user.save();
    res.status(200).json({ newPassword });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "密码找回失败，确认用户名或邮件地址。" });
  }
};

// 生成6位随机密码
function generateRandomPassword(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: "用户不存在" });
    const { password, ...info } = user.toJSON();
    if (!info.avatar) info.avatar = "default-avatar.jpg";
    res.status(200).json({ user: info });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "获取用户信息失败" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const { email, avatar, phone } = req.body;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).json({ message: "更新成功" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "更新个人信息失败" });
  }
};
