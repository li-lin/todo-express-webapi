import moment from "moment";
import { Todo } from "../models/db.js";

export const addTodo = async (req, res) => {
  try {
    const { title, dueDate, note } = req.body;
    const userId = req.user.id;
    const newTodo = await Todo.create({
      title,
      dueDate,
      note,
      userId,
    });
    return res.status(200).json({ data: newTodo });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "待办事项创建失败" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.findAll({
      where: {
        userId,
      },
      order: [["dueDate", "ASC"]],
    });
    return res.status(200).json({ data: todos });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "获取待办列表失败" });
  }
};

export const getTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: "待办事项不存在" });
    }
    return res.status(200).json({ data: todo });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "获取待办事项失败" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: "待办事项不存在" });
    }

    const { title, dueDate, note, status } = req.body;
    title && (todo.title = title);
    dueDate && (todo.dueDate = dueDate);
    note && (todo.note = note);
    if (status !== undefined) {
      todo.status = status;
      if (status) {
        todo.completedAt = moment().format("YYYY-MM-DD HH:mm:ss");
      } else {
        todo.completedAt = null;
      }
    }

    await todo.save();
    return res.status(200).json({ data: todo });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "更新待办事项失败" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(404).json({ message: "待办事项不存在" });
    }
    await todo.destroy();
    return res.status(201).json({ message: "删除待办事项成功" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "删除待办事项失败" });
  }
};
