import databaseQuery from './queries.js';

// Pull choice lists from database for Inquirer prompt
let departmentList = await databaseQuery('SELECT name FROM department');
let roleList = await databaseQuery('SELECT title FROM role');
let managerList = await databaseQuery('SELECT first_name, last_name FROM employee WHERE manager_id is NULL');
let employeeList = await databaseQuery('SELECT first_name, last_name FROM employee');


// Format choice lists for Inquirer prompt
roleList = roleList.map(item => {return {name: item.title}});        
managerList = managerList.map(item => {return {name: `${item.first_name} ${item.last_name}`}});
managerList.push({name: 'No Manager'});
employeeList = employeeList.map(item => {return {name: `${item.first_name} ${item.last_name}`}});

const questions = [
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
    },
    {
        type: 'rawlist',
        message: "Which Employee's Role do you want to update?",
        name: 'updateEmployee',
        choices: employeeList,
        when: (answers) => answers.actionChoice === 'Update an Employee Role',
    },
    {
        type: 'rawlist',
        message: "What is the Employee's new Role?",
        name: 'updateEmployeeRole',
        choices: roleList,
        when: (answers) => answers.actionChoice === 'Update an Employee Role',
    }
];

export default questions;