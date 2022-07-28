// Import Modules and files
import mysql from 'mysql2';
import inquirer from 'inquirer';
import cTable from 'console.table';
import database from './config/connection.js';
import databaseQuery from './helper-files/queries.js';
import * as query from './helper-files/queries.js';
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
        displayTable = await databaseQuery(query.viewDepartments);
    } else if (answers.actionChoice === "View all Roles") {
        displayTable = await databaseQuery(query.viewRoles);
    } else if (answers.actionChoice === "View all Employees") {
        displayTable = await databaseQuery(query.viewEmployees);
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
        await databaseQuery(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newEmployeeFirstName}", "${answers.newEmployeeLastName}", "${newEmployeeRole}", "${newEmployeeManagerID}")`);
        console.log(`New Employee "${answers.newEmployeeFirstName} ${answers.newEmployeeLastName}" added.`);
    } else if (answers.actionChoice === "Update an Employee Role") {
        let updateEmployeeRole = await databaseQuery(`SELECT id FROM role WHERE title = "${answers.updateEmployeeRole}";`);
        let updateEmployeeRoleID = updateEmployeeRole[0].id;
        let updateEmployeeID;
        const employeeNameArray = answers.updateEmployee.split(' ');
            updateEmployeeID = await databaseQuery(`SELECT id FROM employee WHERE first_name = "${employeeNameArray[0]}" AND last_name = "${employeeNameArray[1]}"`);
        updateEmployeeID = updateEmployeeID[0].id;
        await databaseQuery(`UPDATE employee SET role_id = "${updateEmployeeRoleID}" WHERE id = "${updateEmployeeID}";`);
        console.log(`Role of Employee "${answers.updateEmployee}" updated to "${answers.updateEmployeeRole}".`);
    }
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