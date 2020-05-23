const mysql = require("mysql")
const inquirer = require("inquirer")
var employeeList = require("./develop/all-employees")
var roles = require("./develop/all-roles")
var addEmployee = require("./develop/add-employee")
var removeEmployee = require("./develop/remove-employee")
var updateEmployeeInfo = require("./develop/update-employee")
var connectMe = require("./develop/connection")

// main.userPrompt(); to call itself- using setTimeout so exporting this code not necessary
var main = {
    userPrompt: function () {

        return inquirer.prompt([{
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Remove Employee", "Update an Employees Information", "Exit?"]
        }])
            .then((result) => {
                switch (result.options) {
                    case "View All Employees":
                        console.log("-----All Employees-----")
                        employeeList.allEmployees();
                        setTimeout(()=>{ main.userPrompt() }, 750);
                        break;

                    case "View All Departments":
                        console.log("-----All Employees by Department-----")
                        employeeList.allDepartment()
                        setTimeout(()=>{ main.userPrompt() }, 750);
                        break;

                    case "View All Roles":
                        console.log("-----List of All Roles Here-----")
                        roles.allRoles()
                        setTimeout(()=>{ main.userPrompt() }, 750);
                        break;

                    case "Add Employee":
                        console.log("-----Adding Employee Here-----")
                        addEmployee.addEmployeeFunc()

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
