const mysql = require("mysql")
const inquirer = require("inquirer")
var employeeList = require("./develop/all-employees")
var roles = require("./develop/all-roles")
var addEmployee = require("./develop/add-employee")
var removeEmployee = require("./develop/remove-employee")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "SummerFalls13",
    database: "employeeListManager_db"
});




function userPrompt() {
    return inquirer.prompt([{
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update an Employees Information", "View All Roles"]
    }])
        .then((result) => {
            switch (result.options) {
                case "View All Employees":
                    console.log("-----All Employees-----")
                    // connection.connect info here? see activity 11 or connection.query for moving and stuff
                    employeeList.allEmployees()


                    break;

                case "View All Employees By Department":
                    console.log("-----All Employees by Department-----")
                    employeeList.allEmployeesByDepartment()
                    break;

                case "View All Employees By Manager":
                    console.log("-----All Employees by Manager-----")
                    employeeList.allEmployeesByManager()
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
                    // prompt update employee role or manager?
                    inquirer.prompt([{
                        type: "list",
                        name: "updates",
                        message: "What would you like to update?",
                        choices: ["Update an Employees Role", "Update an Employees Manager"]
                    }])
                        // see activity 9 
                        //update 'table name' set ? where ?
                        .then((employeeUpdate) => {
                            switch (employeeUpdate.updates) {
                                case "Update an Employees Role":
                                    connection.query("SELECT id, first_name, last_name, title, department, manager FROM list_of_employees", (err, employeeList) => {
                                        if (err) throw (err)
                                        var i;
                                        var roleChanges = []

                                        for (i = 0; i < employeeList.length; i++) {
                                            // console.log(listResults[i])
                                            // identification.push(`${listResults[i].id}`)
                                            var employee = {
                                                name: `${employeeList[i].first_name} ${employeeList[i].last_name}`,
                                                value: {
                                                    first_name: `${employeeList[i].first_name}`,
                                                    last_name: `${employeeList[i].last_name}`,
                                                    title: `${employeeList[i].title}`,
                                                    department: `${employeeList[i].department}`,
                                                    manager: `${employeeList[i].manager}`,
                                                    id: `${employeeList[i].id}`
                                                }

                                            };
                                            roleChanges.push(employee)

                                        }

                                        inquirer.prompt([{
                                            type: "list",
                                            name: "employeeChoice",
                                            message: "Which employees role would you like to update?",
                                            choices: roleChanges
                                        },
                                        {
                                            type: "list",
                                            name: "employeeRole",
                                            message: "What role do you want the Employee to fill?",
                                            choices: ["Salesman", "Sales Lead", "3D Modeler", "Design Lead", "Payroll Rep", "HR Rep"]

                                        }
                                        ])
                                            .then((updateEmployeeRole) => {
                                                connection.query("UPDATE list_of_employees SET ? WHERE ?",
                                                    [{
                                                        title: updateEmployeeRole.employeeRole
                                                    },
                                                    {
                                                        id: updateEmployeeRole.employeeChoice.id
                                                    }],
                                                    (err, roleUpdates) => {
                                                        if (err) throw (err)

                                                    }
                                                )
                                            })
                                            .then(() => {
                                                connection.query("SELECT id, first_name, last_name, title FROM list_of_employees ORDER BY title", (err, updatedEmployeeList) => {
                                                    if (err) throw (err)
                                                    console.table(updatedEmployeeList)
                                                    connection.end()
                                                })
                                            })
                                    })
                                    break;
                                case "Update an Employees Manager":
                                    connection.query("SELECT id, first_name, last_name, title, department, manager FROM list_of_employees", (err, employeeListTwo) => {
                                        if (err) throw (err)
                                        var i;
                                        var managerChanges = []

                                        for (i = 0; i < employeeListTwo.length; i++) {
                                            // console.log(listResults[i])
                                            // identification.push(`${listResults[i].id}`)
                                            var employeeInfo = {
                                                name: `${employeeListTwo[i].first_name} ${employeeListTwo[i].last_name}`,
                                                value: {
                                                    first_name: `${employeeListTwo[i].first_name}`,
                                                    last_name: `${employeeListTwo[i].last_name}`,
                                                    title: `${employeeListTwo[i].title}`,
                                                    department: `${employeeListTwo[i].department}`,
                                                    manager: `${employeeListTwo[i].manager}`,
                                                    id: `${employeeListTwo[i].id}`
                                                }

                                            };
                                            managerChanges.push(employeeInfo)

                                        }
                                        connection.query("SELECT id, first_name, last_name, title FROM list_of_employees WHERE title Like '%manage%'", (err, managerQuery)=>{
                                            if (err) throw (err)
                                            var l;
                                            var managerList = []
                                            for (l = 0; l<managerQuery.length; l++){
                                                var managerInfo ={
                                                    name: `${managerQuery[l].first_name} ${managerQuery[l].last_name}`,
                                                    value: {
                                                        name: `${managerQuery[l].first_name}, ${managerQuery[l].last_name}`,
                                                        first_name: `${managerQuery[l].first_name}`,
                                                        last_name: `${managerQuery[l].last_name}`,
                                                        title: `${managerQuery[l].title}`,
                                                        id: `${managerQuery[l].id}`
                                                    }
                                                };
                                                managerList.push(managerInfo)
                                            }
                                            inquirer.prompt([{
                                                type: "list",
                                                name: "employeeChoiceTwo",
                                                message: "Which employee would you like to update?",
                                                choices: managerChanges
                                            },
                                            {
                                                type: "list",
                                                name: "managers",
                                                message: "Which Manager should the Employee report to?",
                                                choices: managerList
    
                                            }
                                            ])
                                            .then((updateEmployeeManager) => {
                                                connection.query("UPDATE list_of_employees SET ? WHERE ?",
                                                    [{
                                                        manager: updateEmployeeManager.managers.name
                                                    },
                                                    {
                                                        id: updateEmployeeManager.employeeChoiceTwo.id
                                                    }],
                                                    (err, roleUpdates) => {
                                                        if (err) throw (err)
    
                                                    }
                                                )
                                            })
                                            .then(() => {
                                                connection.query("SELECT id, first_name, last_name, manager FROM list_of_employees ORDER BY manager", (err, updatedEmployeeListAgain) => {
                                                    if (err) throw (err)
                                                    console.table(updatedEmployeeListAgain)
                                                    connection.end()
                                                })
                                            });
                                        })

                                    })
                                    break;
                            }

                        })

                    break;

                case "View All Roles":
                    // this is 100% working how exciting
                    roles.allRoles();
                    break;
            }
        })

}
userPrompt();