import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';
async function getTriviaQuestions() {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
        const questions = response.data.results;
        return questions.map((q) => {
            const choices = [...q.incorrect_answers, q.correct_answer];
            // Shuffle choices to randomize the order
            for (let i = choices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [choices[i], choices[j]] = [choices[j], choices[i]];
            }
            return {
                question: q.question,
                choices,
                correctAnswer: q.correct_answer,
            };
        });
    }
    catch (error) {
        throw new Error('Failed to fetch trivia questions');
    }
}
async function main() {
    console.log(chalk.yellow('Welcome to the Computer Science Quiz!'));
    const questions = await getTriviaQuestions();
    const answers = await inquirer.prompt(questions.map((q, index) => ({
        type: 'list',
        name: `q${index + 1}`,
        message: q.question,
        choices: q.choices,
    })));
    let correctAnswers = 0;
    let wrongAnswers = 0;
    questions.forEach((question, index) => {
        if (answers[`q${index + 1}`] === question.correctAnswer) {
            console.log(chalk.green('Correct!'));
            correctAnswers++;
        }
        else {
            console.log(chalk.red(`Incorrect. Correct answer: ${question.correctAnswer}`));
            wrongAnswers++;
        }
    });
    console.log(chalk.yellow(`You got ${correctAnswers} out of 10 questions correct.`));
    if (correctAnswers >= 5) {
        console.log(chalk.green('Congratulations! You passed the Computer Science quiz.'));
    }
    else {
        console.log(chalk.red('Sorry, you failed the Computer Science quiz.'));
    }
    const tryAgainPrompt = await inquirer.prompt({
        type: 'list',
        name: 'tryAgain',
        message: 'Try again or exit?',
        choices: ['Try again', 'Exit'],
    });
    if (tryAgainPrompt.tryAgain === 'Try again') {
        main();
    }
    else {
        console.log(chalk.yellow('Thank you for playing the Computer Science quiz!'));
    }
}
main();
