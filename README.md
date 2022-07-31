
  # Employee Tracker

  ## Description

  The Employee Tracker is a node.js app run entirely in the Command Line Interface, allowing the user to interact with their company's database. The app uses Inquirer to take input from the user, and communicates with a MySQL database. The user is able to view tables that show all of the company's departments, roles, employees, salaries, and managers, as well as the relationship between those data. In addition, user can manipulate the data in the table, by adding departments, roles, or employees, as well as updating an existing employee's role.

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Questions](#questions)

  ## Installation

  To install, the user simply downloads the application root folder and helper files. The user needs to be running Node v12.22.12 or newer. They then type "npm install" on the command line to download all npm dependancies, which include Inquirer, MySQL2, and console.table. Before running the app for the first time, the user should open a MySql shell in the root folder and install the database schema file, located in the db folder. From the MySql promt, type "source db/schema.sql". The optional seeds file to give placeholder data to the table can be run with "source db/seeds.sql".

  ## Usage

  To run the app, simply type "npm start" or "node server.js" in the command line of the root folder. The app will load the database and prompt the user on what they would like to do. Simply follow the on screen instructions and the app will provide the requested data or do the requested work. The initial prompt will ask the user if they would like to View all Departments, View all Roles, View all Employees, Add a Department, Add a Role, Add an Employee, or Update an Employee Role. Based on the choice, the app will either prompt the user for more data or display the desired data. The user can repeat the intial prompt as many times as they like.

  [Video walkthrough of Using the App](https://drive.google.com/file/d/1YCGkkhPIvaGsb9EqAhfwlhR3zxtDTEyd/view)

  ![Usage Screenshot 1](./images/employee-tracker-screenshot1.png?raw=true)

  ![Usage Screenshot 2](./images/employee-tracker-screenshot2.png?raw=true)
  
  ![Usage Screenshot 2](./images/employee-tracker-screenshot3.png?raw=true)

  ## Features

  - Keep track of structure of company
  - Use relational database to dynamically view or alter data
  - Simple Command Line Interface
  - Easy to install and run

  ## Questions

  If you have additional questions, please contact me at: max.mcdonough@gmail.com

  Github: [MMMPhoto](https://github.com/MMMPhoto)
  
  [Github Repo for this Application](https://github.com/MMMPhoto/employee-tracker)

  --------------------------------------

  ### &copy; 2022 Max McDonough


  
