import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.bgMagenta("+++++++++++++++++++++++++++++++++ ADVENTURE GAME ++++++++++++++++++++++++++++++++++"));

class Fighter {
  constructor(name : any, maxHealth :any) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
  }

  attack(enemy: any) {
    const damage = Math.floor(Math.random() * 10) + 1;
    enemy.health -= damage;
    return damage;
  }

  drinkPotion() {
    const healing : number = Math.floor(Math.random() * 15) + 5;
    this.health += healing;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
    return healing;
  }

  isAlive() {
    return this.health > 0;
  }
}

const enemies : any = [
  new Fighter('Dragon', 60),
  new Fighter('Orc', 40),
  new Fighter('Goblin', 30),
];

let player : any;

function startGame() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your character name:',
      },
      {
        type: 'confirm',
        name: 'encounterEnemy',
        message: 'Do you want to encounter an enemy?',
        default: true,
      },
    ])
    .then((answers) => {
      player = new Fighter(answers.name, 50);
      console.log(chalk.green(`Welcome, ${player.name}! Your health: ${player.health}`));

      if (answers.encounterEnemy) {
        chooseEnemy();
      } else {
        console.log(chalk.blue('You chose not to encounter an enemy.\n You Coword.\n Game over'));
      }
    });
}

function chooseEnemy() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'enemy',
        message: 'Choose an enemy to fight:',
        choices: enemies.map((enemy) => enemy.name),
      },
    ])
    .then((answers) => {
      const enemy = enemies.find((e) => e.name === answers.enemy);
      if (!enemy) {
        console.log(chalk.red('Invalid enemy selection. Please choose a valid enemy.'));
        chooseEnemy();
        return;
      }

      const enemyIndex = enemies.indexOf(enemy);
      enemies.splice(enemyIndex, 1);

      fightEnemy(enemy);
    });
}

function fightEnemy(enemy) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: `You are fighting a ${enemy.name}! What do you want to do?`,
        choices: ['Attack', 'Drink Potion', 'Run'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Attack':
          const damage = player.attack(enemy);
          const enemyDamage = enemy.attack(player);
          console.log(chalk.yellow(`You dealt ${damage} damage to the ${enemy.name}.`));
          console.log(chalk.red(`The ${enemy.name} dealt ${enemyDamage} damage to you.`));

          if (player.isAlive() && enemy.isAlive()) {
            fightEnemy(enemy);
          } else if (player.isAlive() && !enemy.isAlive()) {
            console.log(chalk.green(`You defeated the ${enemy.name}! Your health: ${player.health}`));

            if (enemies.length > 0) {
              inquirer
                .prompt([
                  {
                    type: 'confirm',
                    name: 'continue',
                    message: 'Do you want to fight another enemy? (Y/n)',
                    default: true,
                  },
                ])
                .then((answers) => {
                  if (answers.continue) {
                    chooseEnemy();
                  } else {
                    console.log(chalk.bold.bgBlue(' You win!\n Game over.'));
                  }
                });
            } else {
              console.log(chalk.bold.bgCyan('You defeated all.\n you are Legand.\n You win! \n Game over.'));
            }
          } else {
            console.log(chalk.bold.bgGray('you loose. \n Game over.'));
          }
          break;

        case 'Drink Potion':
          const healing = player.drinkPotion();
          console.log(chalk.green(`You drank a potion and healed for ${healing} health.`));
          fightEnemy(enemy);
          break;

        case 'Run':
          console.log(chalk.bold.blue(' You lose!\n Game over.'));
          break;
      }
    });
}

startGame();