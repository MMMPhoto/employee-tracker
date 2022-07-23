// Import core modules
import fs from 'fs';
import inquirer from 'inquirer';

// Import Questions
import questions from './questions.js';

// CLI input
function userInput(questions) {
    return inquirer.prompt(questions);
};


userInput(questions)
.then((answers) => {
    console.log(answers);
});
