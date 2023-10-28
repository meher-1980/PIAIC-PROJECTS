import * as readline from 'readline';
class BankAccount {
    accountNumber;
    accountHolderName;
    balance;
    constructor(accountHolderName, accountNumber) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = null;
    }
    deposit(amount) {
        if (amount > 0) {
            if (this.balance === null) {
                this.balance = amount;
            }
            else {
                this.balance += amount;
            }
            console.log(`Deposited $${amount}. Thank you for choosing MyBank.`);
        }
        else {
            console.log('Invalid amount for deposit. Thank you for choosing MyBank.');
        }
    }
    withdraw(amount) {
        if (amount > 0) {
            if (this.balance !== null && amount <= this.balance) {
                this.balance -= amount;
                console.log(`Withdrawn $${amount}. Thank you for choosing MyBank.`);
            }
            else if (this.balance === null || amount > this.balance) {
                console.log('Insufficient funds. Your account is empty. Thank you for choosing MyBank.');
            }
        }
        else {
            console.log('Invalid amount for withdrawal. Thank you for choosing MyBank.');
        }
    }
    checkBalance() {
        if (this.balance !== null && this.balance > 0) {
            console.log(`Account holder: ${this.accountHolderName}`);
            console.log(`Account number: ${this.accountNumber}`);
            console.log(`Current balance: $${this.balance}`);
            console.log('Thank you for choosing MyBank.');
        }
        else {
            console.log('Your account is empty. Thank you for choosing MyBank.');
        }
    }
}
const accounts = {};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function createAccount() {
    rl.question('Enter your name: ', (accountHolderName) => {
        const accountNumber = generateAccountNumber();
        const account = new BankAccount(accountHolderName, accountNumber);
        accounts[accountNumber] = account;
        console.log(`Account created. Your account number is: ${accountNumber}`);
        console.log('Thank you for joining MyBank.');
        mainMenu();
    });
}
function generateAccountNumber() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}
function deposit() {
    rl.question('Enter your account number: ', (accountNumber) => {
        if (accounts[accountNumber]) {
            rl.question('Enter the deposit amount: $', (amount) => {
                accounts[accountNumber].deposit(parseFloat(amount));
                mainMenu();
            });
        }
        else {
            console.log('Account not found. Thank you for choosing MyBank.');
            mainMenu();
        }
    });
}
function withdraw() {
    rl.question('Enter your account number: ', (accountNumber) => {
        if (accounts[accountNumber]) {
            rl.question('Enter the withdrawal amount: $', (amount) => {
                accounts[accountNumber].withdraw(parseFloat(amount));
                mainMenu();
            });
        }
        else {
            console.log('Account not found. Thank you for choosing MyBank.');
            mainMenu();
        }
    });
}
function checkBalance() {
    rl.question('Enter your account number: ', (accountNumber) => {
        if (accounts[accountNumber]) {
            accounts[accountNumber].checkBalance();
            mainMenu();
        }
        else {
            console.log('Account not found. Thank you for choosing MyBank.');
            mainMenu();
        }
    });
}
function mainMenu() {
    console.log('\nMyBank - Account Management');
    console.log('1. Create Account');
    console.log('2. Deposit');
    console.log('3. Withdraw');
    console.log('4. Check Balance');
    console.log('5. Exit');
    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                createAccount();
                break;
            case '2':
                deposit();
                break;
            case '3':
                withdraw();
                break;
            case '4':
                checkBalance();
                break;
            case '5':
                console.log('Thank you for using MyBank.');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please enter a valid option.');
                mainMenu();
        }
    });
}
mainMenu();
