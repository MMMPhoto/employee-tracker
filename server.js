// Import Modules and files
// import express from 'express';
import mysql from 'mysql2';
import inquirer from 'inquirer';
import ctable from 'console.table';
// import getDepartments from './helper-files/queries.js';
// import userInput from './helper-files/inquirer.js';
// import questions from './helper-files/questions.js';



// const PORT = process.env.PORT || 3001;
// const app = express();

// // Set express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Create database connection
const database = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'My$ql1981',
        database: 'company_db'    
    },
    console.log('Connected to company database.')
);

// MySQL query to get departments
function databaseQuery(sql) {
    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
};

// Async funtion to get departments
async function userInterface() {
    // Pull choice lists from database for Inquirer prompt
    let departmentList = await databaseQuery('SELECT name FROM department');
    let roleList = await databaseQuery('SELECT title FROM role');
    roleList = roleList.map(item => {return {name: item.title}});
    let managerList = await databaseQuery('SELECT first_name, last_name FROM employee WHERE manager_id is NULL');
    // managerFirstNames = managerList.map(item => item.first_name);
    // managerLastNames = managerList.map(item => item.first_name);
    // managerList = managerList.forEach(element => {
        
    managerList = managerList.map(item => {return {name: `${item.first_name} ${item.last_name}`}});
    
    // managerList = managerList.map(item => return {name: })
    managerList.push({name: 'No Manager'});
    console.log(departmentList);
    console.log(roleList);
    console.log(managerList);
    inquirer.prompt([
        {
            type: 'list',
            message: 'Welcome to the company database! What would you like to do?',
            name: 'actionChoice',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
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
            type: 'list',
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
            type: 'list',
            message: "What is the new Employee's Role?",
            name: 'newEmployeeRole',
            choices: roleList,
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'list',
            message: "Who is the new Employee's Manager?",
            name: 'newEmployeeManager',
            // TO DO: Find way to input Manager choices dynamically
            choices: managerList,
            when: (answers) => answers.actionChoice === 'Add an Employee',
        }
        // TO DO: Add prompts for Updating Employee Role
    ])
    .then((answers) => {
        console.log(answers);
    });
};

// Call database connection
database.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    };
    userInterface();
});   

// Set listening on PORT
// app.listen(PORT, () => 
//     console.log(`App listening on ${PORT}`)
// );

// export default database;