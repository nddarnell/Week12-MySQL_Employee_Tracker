CREATE DATABASE employeeListManager_db;

CREATE TABLE list_of_employees(
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    
    primary key (id)
);

CREATE TABLE department (
 id INT AUTO_INCREMENT NOT NULL,
 department_name VARCHAR(30) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE roles(
	id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_name_id INT NOT NULL,
    PRIMARY KEY (id)
);

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


