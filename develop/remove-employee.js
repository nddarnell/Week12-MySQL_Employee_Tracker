const mysql = require("mysql")

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

var remove = {
    allRemove: function () {
        //need inquirer prompt to read list of employees with
        connection.query("SELECT id, first_name, last_name FROM list_of_employees", (err, listResults) => {
            if (err) throw (err)
            // console.table(listResults)
            var i;
            var identification = []

            for (i = 0; i < listResults.length; i++) {
                // console.log(listResults[i])
                // identification.push(`${listResults[i].id}`)
                var person = {
                    name: `${listResults[i].first_name} ${listResults[i].last_name}`,
                    value: {
                        name: `${listResults[i].first_name} ${listResults[i].last_name}`,
                        id: `${listResults[i].id}`
                    }

                };
                identification.push(person)

            }

            inquirer.prompt([{
                type: "list",
                name: "choices",
                message: "Which employee would you like to remove?",
                choices: identification
            }])
                .then((removeList) => {
                    // console.log(removeList.choices.id)
                    connection.query("DELETE FROM list_of_employees WHERE ?",
                        {
                            id: removeList.choices.id
                        },
                        (err, deletedItem) => {
                            if (err) throw (err)

                            connection.end()
                        }
                    )


                })
                .then(() => {
                    connection.query("SELECT id, first_name, last_name, title FROM list_of_employees", (err, updatedList) => {
                        if (err) throw (err)
                        console.table(updatedList)
                    })
                })
        })
    }
}

module.exports = remove