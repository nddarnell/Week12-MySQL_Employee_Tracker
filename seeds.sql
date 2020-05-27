USE employeeListManager_db;

SELECT first_name, last_name, department_name FROM list_of_employees INNER JOIN roles ON list_of_employees.role_id = roles.department_name_id INNER JOIN department ON roles.department_name_id = department.id WHERE list_of_employees.manager_id = 0;


SELECT first_name, last_name, role_id, department_name, title FROM list_of_employees INNER JOIN roles ON list_of_employees.role_id = roles.department_name_id INNER JOIN department ON roles.department_name_id = department.id;


INSERT INTO department(department_name)
VALUE ("Sales"), ("Design"), ("Payroll");

SELECT * FROM department;

INSERT INTO roles(title, salary, department_name_id)
Values("Salesman", 65000.00, 1), ("3D Modeler", 70000.00, 2), ("Accountant", 55000.00, 3);

SELECT * FROM roles;

INSERT INTO list_of_employees(first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Nobody", 1, 0), ("Larry", "Smith", 1, 1), 
("Cody", "Prine", 2, 0), ("Pat", "Igore", 2, 3),
("Patti", "Dole", 3, 0), ("Melissa", "Drake", 3, 5);


SELECT * FROM list_of_employees;

drop table list_of_employees;
-- view all roles
select title from list_of_employees 
where title is not null
group by title; 

-- view all employees
select first_name, last_name from list_of_employees;

-- view all employees by department
select first_name, last_name, department from list_of_employees
ORDER BY department;


-- view all employees by manager
select first_name, last_name, manager from list_of_employees
ORDER BY manager;

-- add employee
-- See line 15

-- remove employee
DELETE FROM list_of_employees where first_name = "undefined";

select * from list_of_employees;

select id, first_name, last_name from list_of_employees where id is not null;

select first_name, last_name, title from list_of_employees where title like '%manager%';