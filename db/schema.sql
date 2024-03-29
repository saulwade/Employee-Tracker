-- Create the department table
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Create the role table
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department (id)
);

-- Create the employee table
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

-- Add some seed data to the department table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

-- Add some seed data to the role table
INSERT INTO role (title, salary, department_id) VALUES
('Salesperson', 100000.00, 1),
('Sales Manager', 150000.00, 1),
('Software Engineer', 120000.00, 2),
('Lead Engineer', 180000.00, 2),
('Accountant', 80000.00, 3),
('Financial Analyst', 120000.00, 3),
('Lawyer', 150000.00, 4),
('Legal Intern', 50000.00, 4);

-- Add some seed data to the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 2, NULL),
('Jane', 'Smith', 3, 1),
('Mike', 'Johnson', 1, 2),
('Emily', 'Jones', 4, 2),
('David', 'Lee', 5, 4),
('Karen', 'Williams', 6, 4),
('Kevin', 'Brown', 7, NULL),
('Samantha', 'Davis', 8, 7);
