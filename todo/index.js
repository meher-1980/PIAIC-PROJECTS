import inquirer from "inquirer";
console.log("====== MY TODO LIST ======");
let todos = [];
async function MyTodo(todos) {
    do {
        let answer = await inquirer.prompt({
            type: "list",
            message: "select options",
            name: "choose",
            choices: ["add", "view", "delete"]
        });
        if (answer.choose == "add") {
            let addtodo = await inquirer.prompt({
                type: "input",
                message: "add item ",
                name: "todo",
            });
            todos.push(addtodo.todo);
            console.log(todos);
        }
        if (answer.choose == "view") {
            console.log(todos);
        }
        if (answer.choose == "delete") {
            let deletetodo = await inquirer.prompt({
                type: "list",
                message: "delete your item",
                name: "todo",
                choices: todos.map(item => item),
            });
            let newTodos = todos.filter(val => val !== deletetodo.todo);
            todos = [...newTodos];
            console.log(todos);
        }
    } while (true);
}
MyTodo(todos);
