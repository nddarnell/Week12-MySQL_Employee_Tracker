CREATE DATABASE employeeListManager_db;

USE employeeListManager_db;

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





