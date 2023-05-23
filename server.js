// Dependencies
const chalk = require("chalk");
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

// Connection configuration
const connectionConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB",
  multipleStatements: true,
};

// Create connection to database
const connection = mysql.createConnection(connectionConfig);

// Connect to database
connection.connect((err) => {
  if (err) throw err;

  // Display welcome message
  console.table(chalk.yellow("\n WELCOME TO EMPLOYEE TRACKER \n"));
  console.table(chalk.yellow.bold(`====================================================================================`));
  console.log(``);
  console.table(chalk.greenBright.bold(figlet.textSync("Employee Tracker")));
  console.log(``);
  console.log(``);
  console.table(chalk.yellow.bold(`====================================================================================`));

  // Start main function
  badCompany();
});

// Main function
const badCompany = () => {
  // Prompt user for action
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add an employee",
        "Add a role",
        "View departments",
        "View employees",
        "View roles",
        "Update employee roles",
        "Update employee managers",
        "View employees by manager",
        "Delete department",
        "Delete role",
        "Delete employee",
        "View the total utilized budget of a department",
        "Exit",
      ],
    })
    .then(handleAction)
    .catch((err) => {
      console.error(chalk.red("An error occurred: "), err);
    });
};

// Handle user action
const handleAction = async (answer) => {
  switch (answer.action) {
    case "Add a department":
      await addDepartment();
      break;
    case "Add an employee":
      await addEmployee();
      break;
    case "Add a role":
      await addRole();
      break;
    case "View departments":
      await viewDepartments();
      break;
    case "View employees":
      await viewEmployees();
      break;
    case "View roles":
      await viewRoles();
      break;
    case "Update employee roles":
      await updateEmpRole();
      break;
    case "Update employee managers":
      await updateEmpManagers();
      break;
    case "Delete department":
      await deleteDepartment();
      break;
    case "Delete role":
      await deleteRole();
      break;
    case "Delete employee":
      await deleteEmployee();
      break;
    case "View the total utilized budget of a department":
      await companyBudget();
      break;
    case "Exit":
      console.log(chalk.yellow.bold("Goodbye!"));
      connection.end();
      break;
    default:
      console.log(chalk.red(`Invalid action: ${answer.action}`));
      break;
  }
};

const viewDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(chalk.blue("All Departments"), results);
    badCompany();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then((answers) => {
      const query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answers.name], (err, results) => {
        if (err) throw err;
        console.log(results);
        badCompany();
      });
    })
    .catch((err) => {
      throw err;
    });
};

const viewRoles = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(chalk.blue("All Roles"), results);
    badCompany();
  });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "department",
        type: "input",
        message: "What is the department ID of the new role?",
      },
    ])
    .then((answers) => {
      const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [answers.title, answers.salary, answers.department], (err, results) => {
        if (err) throw err;
        console.log(results);
        badCompany();
      });
    })
    .catch((err) => {
      throw err;
    });
};

const viewEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(chalk.blue("All Employees"), results);
    badCompany();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "manager",
        type: "input",
        message: "What is the employee's manager ID?",
      },
    ])
    .then((answers) => {
      const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(query, [answers.firstName, answers.lastName, answers.role, answers.manager], (err, results) => {
        if (err) throw err;
        console.log(results);
        badCompany();
      });
    })
    .catch((err) => {
      throw err;
    });
};

const updateEmpRole = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is your employee ID?",
      },
      {
        name: "role",
        type: "input",
        message: "What is your new role ID?",
      },
    ])
    .then((answers) => {
      const query = "UPDATE employee SET role_id = ? WHERE id = ?";
      connection.query(query, [answers.role, answers.id], (err, results) => {
        if (err) throw err;
        console.log(results);
        badCompany();
      });
    })
    .catch((err) => {
      throw err;
    });
};
