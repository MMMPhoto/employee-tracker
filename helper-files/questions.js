let roleDepartment = [];
import express from 'express';
import mysql from 'mysql2';
// import getDepartments from './queries.js';

// let roleDepartment = getDepartments()


const questions = [
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
        // TO DO: Find way to input Department choices dynamically
        choices: roleDepartment,
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
        // TO DO: Find way to input Role choices dynamically
        choices: ["Marketing Manager", "Senior Developer", "Accountant"],
        when: (answers) => answers.actionChoice === 'Add an Employee',
    },
    {
        type: 'list',
        message: "Who is the new Employee's Manager?",
        name: 'newEmployeeManager',
        // TO DO: Find way to input Manager choices dynamically
        choices: ["Robert Specktor", "Elizabeth Brokaw", "Patrick Whitacker", "Jessica Nysmith", "None"],
        when: (answers) => answers.actionChoice === 'Add an Employee',
    }
    // TO DO: Add prompts for Updating Employee Role
];

export default questions;