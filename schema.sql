CREATE DATABASE employeeListManager_db;

CREATE TABLE list_of_employees(
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    title VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(40) NOT NULL,
    
    primary key (id)
);

INSERT INTO list_of_employees(first_name, last_name, title, department, salary, manager)
VALUES ("Joe", "Nobody", "Salesman", "Sales", 75000, "Alex Bourne"), ("Larry", "Smith", "Salesman", "Sales", 75000, "Alex Bourne"),
("Alex", "Bourne", "Sales Lead", "Sales", 90000, "Noel Miller"), ("Cody", "Prine", "3D Modeler", "Design", 70000, "Eric Saperstine"),
("Pat", "Igore", "3D Modeler", "Design", 70000, "Eric Saperstine"), ("Eric", "Saperstine", "Design Lead", "Design", 90000, "Noel Miller"),
("Patti", "Dole", "HR Rep", "Human Resources", 110000, "Noel Miller"), ("Melissa", "Drake", "Payroll Rep", "Payroll", 55000, "Noel Miller"),
("Noel", "Miller", "CEO", "Board of Directors", 250000, "Share Holders");

select * from list_of_employees;
-- view all roles
select title from list_of_employees 
where title is not null
group by title; 

-- view all employees
select first_name, last_name from list_of_employees;

-- view all employees by department
select first_name, last_name, department from list_of_employees;

-- view all employees by manager
select first_name, last_name, manager from list_of_employees;



