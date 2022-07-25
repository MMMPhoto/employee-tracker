// Import Modules and files
import mysql from 'mysql2';
import inquirer from 'inquirer';
import ctable from 'console.table';
let answers;
// import questions from './helper-files/questions.js';
// import getDepartments from './helper-files/queries.js';
// import userInput from './helper-files/inquirer.js';

// Create database connection
const database = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'My$ql1981',
        database: 'company_db'    
    },
    console.log('Welcome to the company database!')
);

// MySQL query to get departments
function databaseQuery(sql) {
    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
};

// Async funtion for Inquirer 
async function userInterface() {
    // Pull choice lists from database for Inquirer prompt
    let departmentList = await databaseQuery('SELECT name FROM department');
    let roleList = await databaseQuery('SELECT title FROM role');
    let managerList = await databaseQuery('SELECT first_name, last_name FROM employee WHERE manager_id is NULL');
    // Format choice lists for Inquirer prompt
    roleList = roleList.map(item => {return {name: item.title}});        
    managerList = managerList.map(item => {return {name: `${item.first_name} ${item.last_name}`}});
    managerList.push({name: 'No Manager'});
    console.log('-------------');
    // Inquirer questions
    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'What would you like to do?',
            name: 'actionChoice',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },
        {
            type: 'input',
            message: "Please enter the name of the new Department:",
            name: 'newDepartment',
            when: (answers) => answers.actionChoice === 'Add a Department',
        },
        {
            type: 'input',
            message: "Please enter the Name of the new Role:",
            name: 'newRole',
            when: (answers) => answers.actionChoice === 'Add a Role',
        },
        {
            type: 'input',
            message: "Please enter the Salary for the new Role:",
            name: 'newRoleSalary',
            when: (answers) => answers.actionChoice === 'Add a Role',
        },
        {
            type: 'rawlist',
            message: "Which Department is the new Role in?",
            name: 'newRoleDepartment',
            choices: departmentList,
            when: (answers) => answers.actionChoice === 'Add a Role',
        },
        {
            type: 'input',
            message: "Please enter the First Name of the new Employee:",
            name: 'newEmployeeFirstName',
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'input',
            message: "Please enter the Last Name of the new Employee:",
            name: 'newEmployeeLastName',
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'rawlist',
            message: "What is the new Employee's Role?",
            name: 'newEmployeeRole',
            choices: roleList,
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'rawlist',
            message: "Who is the new Employee's Manager?",
            name: 'newEmployeeManager',
            choices: managerList,
            when: (answers) => answers.actionChoice === 'Add an Employee',
        }
    ])
    // Return Inquirer Answers
    .then((answers) => {
        displayAnswers(answers);
        console.log('-------------');
    });
};

const displayAnswers = async (answers) => {
    if (answers.actionChoice === "View all Departments") {
        let departmentTable = await databaseQuery('SELECT * FROM department');
        console.table(departmentTable);
    } else if (answers.actionChoice === "View all Roles") {
        let roleTable = await databaseQuery('SELECT * FROM role');
        console.table(roleTable);
    };
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

// export default database;