import inquirer from 'inquirer';
import chalk from 'chalk';
import { format, differenceInSeconds } from 'date-fns';
async function countdownTimer() {
    const questions = [
        {
            type: 'input',
            name: 'duration',
            message: 'Enter countdown duration (in seconds):',
            validate: (input) => {
                if (/^\d+$/.test(input)) {
                    return true;
                }
                return 'Please enter a valid number.';
            },
        },
    ];
    const { duration } = await inquirer.prompt(questions);
    const targetTime = new Date();
    targetTime.setSeconds(targetTime.getSeconds() + parseInt(duration, 10));
    const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const remainingTimeInSeconds = differenceInSeconds(targetTime, currentTime);
        if (remainingTimeInSeconds > 0) {
            const formattedTime = format(currentTime, 'mm:ss');
            console.clear();
            console.log(chalk.yellow('Countdown Timer:'));
            console.log(chalk.green(`Remaining time: ${formattedTime}`));
        }
        else {
            clearInterval(timerInterval);
            console.clear();
            console.log(chalk.red('Time\'s up!'));
        }
    }, 1000);
}
console.log(chalk.yellow('Welcome to the Countdown Timer!'));
countdownTimer();
