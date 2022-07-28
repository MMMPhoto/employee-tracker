// Import Modules and files
import mysql from 'mysql2';
import inquirer from 'inquirer';
import cTable from 'console.table';
import database from './config/connection.js';
import databaseQuery from './helper-files/queries.js';
import questions from './helper-files/questions.js';
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

const tableDisplay = async (answers) => {
    let displayTable;
    if (answers.actionChoice === "View all Departments") {
        displayTable = await databaseQuery("SELECT department.id AS 'ID', department.name AS 'Name' FROM department");
    } else if (answers.actionChoice === "View all Roles") {
        displayTable = await databaseQuery("SELECT role.id AS 'ID', role.title AS 'Title', role.salary AS 'Salary', department.name AS 'Department' FROM role JOIN department ON role.department_id = department.id;");
    } else if (answers.actionChoice === "View all Employees") {
        displayTable = await databaseQuery("SELECT a.id AS 'ID', a.first_name AS 'First Name', a.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employee a JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id LEFT OUTER JOIN employee b ON a.manager_id = b.id;");
    };
    console.log('');
    console.table(displayTable);
    console.log('-------------');
};

const updateDatabase = async (answers) => {
    if (answers.actionChoice === "Add a Department") {
        await databaseQuery(`INSERT INTO department (name) VALUES  ("${answers.newDepartment}")`)
        console.log(`New Department "${answers.newDepartment}" added.`)
    } else if (answers.actionChoice === "Add a Role") {
        let newRoleDepartment = await databaseQuery(`SELECT id FROM department WHERE name = "${answers.newRoleDepartment}";`);
        newRoleDepartment = newRoleDepartment[0].id;
        await databaseQuery(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.newRole}", "${answers.newRoleSalary}", "${newRoleDepartment}")`);
        console.log(`New Role "${answers.newRole}" added.`);
    } else if (answers.actionChoice === "Add an Employee") {
        let newEmployeeRole = await databaseQuery(`SELECT id FROM role WHERE title = "${answers.newEmployeeRole}";`);
        newEmployeeRole = newEmployeeRole[0].id;
        let newEmployeeManagerID;
        if (answers.newEmployeeManager === "No Manager") {
            newEmployeeManagerID = "NULL";
        } else {
            const managerNameArray = answers.newEmployeeManager.split(' ');
            newEmployeeManagerID = await databaseQuery(`SELECT id FROM employee WHERE first_name = "${managerNameArray[0]}" AND last_name = "${managerNameArray[1]}"`);
            newEmployeeManagerID = newEmployeeManagerID[0].id;
        };
        console.log(answers.newEmployeeFirstName);
        console.log(answers.newEmployeeLastName);

        await databaseQuery(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newEmployeeFirstName}", "${answers.newEmployeeLastName}", "${newEmployeeRole}", "${newEmployeeManagerID}")`);
        console.log(`New Employee "${answers.newEmployeeFirstName} ${answers.newEmployeeLastName}" added.`);
    };
};

const useAnswers = async (answers) => {
    await tableDisplay(answers);
    await updateDatabase(answers);
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to do anything else?',
            name: 'promptAgain'
        }
    ])
    .then((again) => {
        if (again.promptAgain) {
            userInterface();
        } else {
            console.log('Ending program. Have a nice day!');
            process.exit(0);
        };
    });
};

// Call database connection and run User Interface
database.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    };
    userInterface();
});