import { DataTypes } from "sequelize";
import sequelize from "../utils/connect.js";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z0-9]{4,}$/i,
          msg: "用户名必须至少包含4个字符，并且只能包含字母和数字。",
        },
        isUnique: async function (value) {
          const user = await User.findOne({
            where: {
              username: value,
            },
          });
          if (user) {
            throw new Error("用户名已存在");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
