import express from "express";
import auth from "../utils/auth.js";

import {
  addTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/", auth, addTodo);
router.get("/", auth, getTodos);
router.get("/:todoId", auth, getTodo);
router.put("/:todoId", auth, updateTodo);
router.delete("/:todoId", auth, deleteTodo);

export default router;
