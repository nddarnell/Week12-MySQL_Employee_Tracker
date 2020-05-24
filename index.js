const mysql = require("mysql")
const inquirer = require("inquirer")
//done
var employeeList = require("./develop/all-employees")
//done
var departmentList = require("./develop/all-departments")
//done
var rolesList = require("./develop/all-roles")
// need to update
var addEmployee = require("./develop/add-employee")
// done
var addDepartment = require("./develop/add-department")
// done
var addRole = require("./develop/add-role")

// up in the air whether or not I want to do it
var removeEmployee = require("./develop/remove-employee")
var updateEmployeeInfo = require("./develop/update-employee")
//fine as is
var connectMe = require("./develop/connection")

// main.userPrompt(); to call itself- using setTimeout so exporting this code not necessary
var main = {
    userPrompt: function () {

        inquirer.prompt([{
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Remove Employee", "Update an Employees Information", "Exit?"]
        }])
            .then((result) => {
                switch (result.options) {
                    case "View All Employees":
                        console.log("-----All Employees-----")
                        employeeList.allEmployees();
                        setTimeout(() => { main.userPrompt() }, 750);
                        break;

                    case "View All Departments":
                        console.log("-----All Employees by Department-----")
                        departmentList.allDepartment()
                        setTimeout(() => { main.userPrompt() }, 750);
                        break;

                    case "View All Roles":
                        console.log("-----List of All Roles Here-----")
                        rolesList.allRoles()
                        setTimeout(() => { main.userPrompt() }, 750);
                        break;

                    case "Add Employee":
                        console.log("-----Adding Employee Here-----")
                        addEmployee.addEmployeeFunc()
                        // setTimeout(()=>{ main.userPrompt() }, 750);
                        break;

                    case "Add Department":
                        console.log("-----Adding Department Here-----")
                        addDepartment.addNewDepartment()
                        setTimeout(() => { main.userPrompt() }, 750);
                        break;

                    case "Add Role":
                        console.log("-----Adding Role Here-----")
                        addRole.addNewRole();
                        setTimeout(() => { main.userPrompt() }, 750);
                        break;

                    case "Remove Employee":
                        console.log("-----Removing Employee Here-----")
                        removeEmployee.allRemove()

                        break;

                    case "Update an Employees Information":
                        console.log("-----Updated Employee Status Here-----")
                        updateEmployeeInfo.employeesNewStatus()
                        break;

                    case "Exit?":
                        inquirer.prompt([{
                            type: "list",
                            name: "exit",
                            message: "Are you sure?",
                            choices: ["Yes", "No"]
                        }])
                            .then((exitResult) => {
                                if (exitResult.exit === "Yes") {
                                    connectMe.connectorFunc();
                                    connection.end();
                                } else if (exitResult.exit === "No") {
                                    // this will turn into variablename.userPrompt() need to call userprompt in all files
                                    main.userPrompt();
                                }
                            })
                        break;
                }
            })

    }
}
main.userPrompt();

module.exports = main
