#!/user/bin/env node;
import inquirer from "inquirer";
let answers = await inquirer.prompt([
    {
        type: "input",
        name: "userId",
        message: "Enter your Id",
    },
    {
        type: "number",
        name: "userPin",
        message: "Enter your PIN",
    },
    {
        type: "list",
        name: "Required Account",
        choices: ["Current", "Saving"],
        message: "Select your Required Account",
    },
    {
        type: "list",
        name: "Required Transedction",
        choices: ["Fast Cash", "Withdraw"],
        message: "Select your Required Transection",
    },
    {
        type: "list",
        name: "Amount",
        choices: [1000, 2000, 5000, 10000, 20000, 25000],
        message: "Select your Amount",
        when(answers) {
            return answers.requiredTransection === "fast Cash";
        },
    },
    {
        type: "number",
        name: "Amount",
        message: "Enter your Amount",
    },
]);
if (answers.userId && answers.userPin) {
    let balance = Math.floor(Math.random() * 100000000);
    console.log(balance);
    let EnterAmount = answers.Amount;
    if (balance >= EnterAmount) {
        let remaining = balance - EnterAmount;
        console.log("your remaining balance is", remaining);
    }
    else {
        console.log("insuficient Balance");
    }
}
;
