import sequelize from "../utils/connect.js";
import User from "./user.js";
import Todo from "./todo.js";

User.hasMany(Todo, { foreignKey: "userId", as: "todos" });
Todo.belongsTo(User, { foreignKey: "userId", as: "user" });

// await sequelize.sync({ alter: true }).then(() => {
//   console.log("Database synced");
// });

export { User, Todo };
