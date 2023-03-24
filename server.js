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
    case "View a department":
      await viewDepartments();
      break;
    case "View employees":
      await viewEmployees();
      break;
    case "View a role":
      await viewRoles();
      break;
    case "View employees by manager":
      await viewEmpByManager();
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
  if (answer.action !== "View employees by manager" && answer.action !== "Update employee managers") {
    badCompany();
  }
};  
  const updateEmpManagers = () => {
    const query = `SELECT e1.id, CONCAT(e1.first_name,' ', e1.last_name) AS "Employee Name", 
                    r.title AS "Current Role", d.name AS "Current Department",
                    CONCAT(e2.first_name,' ', e2.last_name) AS "Manager"
                    FROM employee e1
                    INNER JOIN roles r ON r.id = e1.role_id
                    INNER JOIN department d ON d.did = r.department_id
                    INNER JOIN employee e2 ON e2.id = e1.manager_id
                    ORDER BY e1.id`;
    connection.query(query, (err, results) => {
      if (err) throw err;
  
      console.table(chalk.blue("All Employees"), results);
  
      inquirer
        .prompt([
          {
            name: "id",
            type: "input",
            message: "What is your employee ID?",
          },
          {
            name: "manager",
            type: "list",
            choices: function () {
              let choiceArr = results.map((choice) => choice["Employee Name"]);
              return choiceArr;
            },
            message: "Select your new manager:",
          },
        ])
        .then((answers) => {
          const managerId = results.filter(
            (item) => item["Employee Name"] === answers.manager
          )[0].id;
  
          const query = `UPDATE employee SET manager_id = ? WHERE id = ?`;
          connection.query(query, [managerId, answers.id], (err, results) => {
            if (err) throw err;
            console.log(results);
            badCompany();
          });
        })
        .catch((err) => {
          throw err;
        });
    });
  };
  
  const companyBudget = () => {
    const query = `SELECT d.name AS "Department Name", SUM(r.salary) AS "Total Utilized Budget"
                    FROM employee e
                    INNER JOIN roles r ON r.id = e.role_id
                    INNER JOIN department d ON d.did = r.department_id
                    GROUP BY d.name`;
    connection.query(query, (err, results) => {
      if (err) throw err;
      console.table(chalk.blue("Total Utilized Budget by Department"), results);
      badCompany();
    });
  };
  
  // Start the application
  badCompany();
  
