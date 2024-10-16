import inquirer from "inquirer";
import { saveTodos, loadTodos } from "../utils/fileHandler.js";
import chalk from "chalk";

/**
 * 할 일을 완료 상태로 표시합니다.
 */
async function completeTodo() {
  const todos = await loadTodos();

  const incompleteTodos = todos.filter((todo) => !todo.completed);

  if (incompleteTodos.length === 0) {
    console.log(chalk.yellow("완료할 할 일이 없습니다."));

    return;
  }

  const choices = incompleteTodos.map((todo) => ({
    name: todo.title,
    value: todo.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "완료할 할 일을 선택하세요:",
      choices,
    },
  ]);

  const updateTodos = todos.map((todo) => {
    if (todo.id === answers.id) {
      return { ...todo, completed: true };
    }

    return todo;
  });

  await saveTodos(updateTodos);

  console.log(chalk.green("할 일이 완료 상태로 표시되었습니다!"));
}

export { completeTodo };
