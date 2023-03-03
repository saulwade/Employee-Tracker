// INSTALL DEPENDENCIES
const chalk = require("chalk");
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

// CREATING CONNECTION TO SERVER
const connection = mysql.createConnection({
  host: "localhost",
  port: "",
  user: "",
  password: "",
  database: "",
  multipleStatements: true,
});

// VARIABLES
const askNewEmployee = [
  "What is the first name?",
  "What is the last name?",
  "What is their role?",
  "Who is their manager?",
];

const roleQuery = `
  SELECT * FROM roles;
  SELECT CONCAT(e.first_name, " ", e.last_name) AS full_name FROM employee e;
`;

const allStaff = `
  SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name, " ", m.last_name) AS "Manager"
  FROM employee e
  LEFT JOIN roles r 
  ON r.id = e.role_id 
  LEFT JOIN department d 
  ON d.did = r.department_id
  LEFT JOIN employee m ON m.id = e.manager_id
  ORDER BY e.id;
`;

const managerQuery = `
  SELECT CONCAT(e.first_name, " ", e.last_name) AS full_name, r.title, d.name 
  FROM employee e 
  INNER JOIN roles r ON r.id = e.role_id 
  INNER JOIN department d ON d.did = r.department_id 
  WHERE name = "Management";
`;

// FUNCTION TO PRINT THE EMPLOYEE TRACKER HEADER
const printHeader = () => {
  console.table(chalk.yellow("\n WELCOME TO EMPLOYEE TRACKER \n"));
  console.table(chalk.yellow.bold("===================================================================================="));
  console.log("\n");
  console.table(chalk.greenBright.bold(figlet.textSync("Employee Tracker")));
  console.log("\n\n");
  console.table(chalk.yellow.bold("===================================================================================="));
};

// FUNCTION TO PROMPT THE USER FOR THE DESIRED ACTION
const promptAction = async () => {
  const choices = [
    "Add a department",
    "Add an employee",
    "Add a role",
    "View a department",
    "View employees",
    "View a role",
    "Update employee roles",
    "Update employee managers",
    "View employees by manager",
    "Delete department",
    "Delete role",
    "Delete employee",
    "View the total utilized budget of a department",
    "Exit",
  ];

  const { action } = await inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices,
  });

  return action;
};

// FUNCTION TO ADD A NEW DEPARTMENT
const addDepartment = async () => {
  // CODE TO ADD A NEW DEPARTMENT
};

// FUNCTION TO ADD A NEW EMPLOYEE
const addEmployee = async () => {
  // CODE TO ADD A NEW EMPLOYEE
};

// FUNCTION TO ADD A NEW ROLE
const addRole = async () => {
  // CODE TO ADD A NEW ROLE
};

// FUNCTION TO VIEW ALL DEPARTMENTS
const viewDepartments = async () => {
  // CODE TO VIEW ALL DEPARTMENTS
};

// FUNCTION TO VIEW ALL EMPLOYEES
const viewEmployees = async () => {
  // CODE TO VIEW ALL EMPLOYEES
};

// FUNCTION TO VIEW ALL ROLES
const viewRoles = async () => {
  // CODE TO VIEW ALL ROLES
};

