#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
//import{add} from "./addition.js";
//import{subtract} from "./subtraction.js";
//import{multiply} from "./multiplication.js";
//import{divide} from "./division.js";

console.log(chalk.bgBlueBright("============================ MY CALCULATOR ==========================="));

let answer: {
    numberOne: number,
    numberTwo: number,
    operator: string,
}

    = await inquirer.prompt([
        {
            type: "number",
            name: "numberOne",
            message: " Enter your first number",

        },
        {
            type: "number",
            name: "numberTwo",
            message: "Enter your second number",
        },
        {
            type: "list",
            name: "operator",
            choices: ["/", "*", "+", "-"],
            message: "Choose your operator",
        }])


const { numberOne, numberTwo, operator } = answer;
if (numberOne && numberTwo && operator) {
    let result: number = 0;
    if (operator === "/") {
        result = numberOne / numberTwo;
    }
    else if (operator === "*") {
        result = numberOne * numberTwo;
    }
    else if (operator === "+") {
        result = numberOne + numberTwo;
    }
    else if (operator === "-") { result = numberOne - numberTwo; }
    console.log(`your answer is : ${result}`);
}



