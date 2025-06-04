import { DataTypes } from "sequelize";
import moment from "moment";
import sequelize from "../utils/connect.js";

const Todo = sequelize.define(
  "todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt: {
      type: DataTypes.DATE,
      defaultValue: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // 将时间格式化为YYYY-MM-DD HH:mm:ss。
      get() {
        return moment(this.getDataValue("createAt")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue("dueDate")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    completedAt: {
      type: DataTypes.DATE,
      get() {
        const value = this.getDataValue("completedAt");
        if (!value) {
          return null;
        }
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Todo;
