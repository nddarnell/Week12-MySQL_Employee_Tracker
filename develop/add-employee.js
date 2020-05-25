const mysql = require("mysql")
const inquirer = require("inquirer")
var connectMe = require("./connection")

var addEmployees = {
    addEmployeeFunc: function () {
        //need for loops for managerId list and roleid list
        connectMe.connectorFunc()

        connection.query("SELECT id, title FROM roles", (err, listResults) => {
            if (err) throw (err)
            var i;
            var roleId = []
            for (i = 0; i < listResults.length; i++) {
                var roles = {
                    name: `${listResults[i].title}`,
                    value: {
                        id: `${listResults[i].id}`
                    }
                }
                roleId.push(roles)
            }
            inquirer.prompt([{
                type: "input",
                name: "firstname",
                message: "What is the employees first name?",
            }, {
                type: "input",
                name: "lastname",
                message: "What is the employees last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What role will this employee fill?",
                choices: roleId
            },
            {
                //add if statement asking if theyre going to be a manager 
                type: "list",
                name: "managerId",
                message: "Will this employee be a manager?",
                choices: ["Yes", "No"]
            }
            ])
                .then((results) => {
                    switch (results.managerId) {
                        case "Yes":
                            //gives manager value id of 0 because they have no manager
                            connection.query("INSERT INTO list_of_employees SET ?",
                                {
                                    first_name: `${results.firstname}`,
                                    last_name: `${results.lastname}`,
                                    role_id: `${results.roleId.id}`,
                                    manager_id: 0
                                }, (err, addRes) => {
                                    if (err) throw (err)
                                    // mainCode.userPrompt(); not working this way
                                    connection.end()
                                })
                            
                            break;

                        case "No":
                            // runs for loop here? for manager?
                            // try to console.table the employee list with managers next to them
                            // inner join where role_id matches the department_name_id and the id of departments
                            var query = "SELECT first_name, last_name, department_name FROM list_of_employees INNER JOIN roles ON list_of_employees.role_id = roles.department_name_id INNER JOIN department ON roles.department_name_id = department.id WHERE list_of_employees.manager_id = 0;"
                            connection.query(query, (err, listOfManagers)=>{
                                if (err) throw (err)
                                console.table(listOfManagers)
                            })

                            connection.query("SELECT id, first_name, last_name, manager_id FROM list_of_employees WHERE manager_id = 0;", (err, managerRes) => {
                                if (err) throw (err)
                                var t;
                                var managerGroup = []
                                for (t = 0; t < managerRes.length; t++) {
                                    var allManagers = {
                                        name: `${managerRes[t].first_name} ${managerRes[t].last_name}`,
                                        value: {
                                            id: `${managerRes[t].id}`
                                        }
                                    }
                                }
                                managerGroup.push(allManagers);

                                inquirer.prompt([{
                                    type: "list",
                                    name: "managerChoice",
                                    message: "Which Manager will this Employee Report to?",
                                    choices: managerGroup
                                }])
                                    .then((newAddition) => {
                                        connection.query("INSERT INTO list_of_employees SET ?",
                                            {
                                                first_name: `${results.firstname}`,
                                                last_name: `${results.lastname}`,
                                                role_id: `${results.roleId.id}`,
                                                manager_id: `${newAddition.managerChoice.id}`
                                            }, (err, addRes) => {
                                                if (err) throw (err)
                                                // main.userPrompt() not working
                                                connection.end()
                                            })
                                    })

                            })

                            break;
                    }
                })
        })
    }
}
module.exports = addEmployees