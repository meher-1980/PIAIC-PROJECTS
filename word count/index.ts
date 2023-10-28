import inquirer from 'inquirer';
import chalk from 'chalk';

function countWordsAndCharacters() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter a sentence or a paragraph:',
      },
    ])
    .then((answers) => {
      const text = answers.text as string;
      const words = text.split(' ').filter((word) => word.trim() !== '');
      const characters = text.replace(/\s/g, '').length;

      console.log(chalk.green(`Word count: ${words.length}`));
      console.log(chalk.cyan(`Character count (excluding spaces): ${characters}`));

      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to continue?',
            default: true,
          },
        ])
        .then((answers) => {
          if (answers.continue) {
            countWordsAndCharacters();
          } else {
            console.log(chalk.blue('Thank you for using the Word and Character Counter!'));
          }
        })
        .catch((error) => {
          console.error(chalk.red('An error occurred:', error));
        });
    })
    .catch((error) => {
      console.error(chalk.red('An error occurred:', error));
    });
}

countWordsAndCharacters();