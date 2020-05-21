const mysql = require("mysql")
const inquirer = require("inquirer")
var connectMe = require("./connection")

var updateEmployeeStatus = {
    employeesNewStatus: function () {
        connectMe.connectorFunc()
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
                            connection.query("SELECT id, first_name, last_name, title FROM list_of_employees WHERE title Like '%manage%'", (err, managerQuery) => {
                                if (err) throw (err)
                                var l;
                                var managerList = []
                                for (l = 0; l < managerQuery.length; l++) {
                                    var managerInfo = {
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

    }
}

module.exports = updateEmployeeStatus