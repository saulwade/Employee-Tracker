-- Insert departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Representative', 50000, 1),
  ('Software Engineer', 100000, 2),
  ('Frontend Developer', 75000, 2),
  ('Accountant', 60000, 3),
  ('Financial Analyst', 80000, 3),
  ('Marketing Manager', 90000, 4),
  ('Marketing Coordinator', 60000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, NULL),
  ('Sarah', 'Williams', 4, 3),
  ('Tom', 'Brown', 5, 4),
  ('Mike', 'Jones', 6, 3),
  ('Kate', 'Davis', 7, NULL),
  ('David', 'Lee', 8, 7);
