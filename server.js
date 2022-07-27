// Import Modules and files
import mysql from 'mysql2';
import inquirer from 'inquirer';
import ctable from 'console.table';
import database from './config/connection.js';
import databaseQuery from './helper-files/queries.js';
import questions from './helper-files/questions.js';
// import questions from './helper-files/questions.js';
// import userInput from './helper-files/inquirer.js';

// Async funtion for Inquirer 
async function userInterface() {
    console.log('-------------');
    // Inquirer questions
    inquirer.prompt(questions)
    .then((answers) => {
        useAnswers(answers);
    });
};

const useAnswers = async (answers) => {
    let displayTable;
    if (answers.actionChoice === "View all Departments") {
        displayTable = await databaseQuery("SELECT department.id AS 'ID', department.name AS 'Name' FROM department");
    } else if (answers.actionChoice === "View all Roles") {
        displayTable = await databaseQuery("SELECT role.id AS 'ID', role.title AS 'Title', role.salary AS 'Salary', department.name AS 'Department' FROM role JOIN department ON role.department_id = department.id;");
    } else if (answers.actionChoice === "View all Employees") {
        displayTable = await databaseQuery("SELECT a.id AS 'ID', a.first_name AS 'First Name', a.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employee a JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id LEFT OUTER JOIN employee b ON a.manager_id = b.id;");
    };
    await console.log('');
    await console.table(displayTable);
    await console.log('-------------');
    await inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to do anything else?',
            name: 'promptAgain'
        }
    ])
    .then((again) => {
        if (again.promptAgain) {
            userInterface();
        };
    });
};

// Call database connection
database.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    };
    userInterface();
});