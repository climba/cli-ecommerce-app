var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "mystore_db"
});

connection.connect(function(err) {
  if (err) throw err;
  adminOptions();

});



function adminOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "View Product Sales by product ID",
        "Add new Product",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Product Sales by Department":
        salesByDept();
        break;

      case "View Product Sales by product ID":
        salesById();
        break;

      case "Add new Product":
        addProducts();
        break;

      }
    });
}

function salesById() {
  console.log("Selecting all products ...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id +
                  " || Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name  );
    }
    inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "Enter the Item ID that you would like to see sales for:",
    
    }).then(function(answer){
      var query = "SELECT item_id, product_name, department_name, SUM(product_sales * products.price) FROM products WHERE item_id = ?";
      connection.query(query, [answer.action], 
        function(err, res) {
          if (err) {
            console.log(err);
          }
          // console.log(res);
          console.log("Total sales for " + res[0].product_name +
                      " is: $" + res[0]['SUM(product_sales * products.price)'] +
                      " it's department is " + res[0].department_name );
      }
    )
    connection.end();
  });
})

}


function salesByDept() {
      // Get all rows in a Department
      // Multiply sales by price for each item ID
      // Add the vales together
       connection.query("SELECT department_name, SUM(product_sales * products.price) FROM products GROUP BY department_name ORDER BY item_id ASC;", function(err, res) {
        if (err) throw err;
        // console.log(res)
        for(var i =0; i < res.length; i++) {
          console.log("The total profits of the " + res[i].department_name + " department are: $" + res[i]['SUM(product_sales * products.price)'])
        }      
      })
      connection.end();
}

function addProducts() {
  inquirer
  .prompt([
    {
    name: "product_name",
    type: "input",
    message: "Enter a new product name",
    },
    {
    name: "department_name",
    type: "input",
    message: "Enter it's department name?",
    },
    {
    name: "price",
    type: "input",
    message: "Enter it's price",
    },
    {
    name: "shipping",
    type: "input",
    message: "Enter it's shipping cost",
    },
    {
    name: "stock_quantity",
    type: "input",
    message: "Enter a begining stock quantity",
    },
    {
    name: "wholesale_cost",
    type: "input",
    message: "Enter it's wholesale cost",
    }
    ]).then(function (answers) {
      addNewItem(answers.product_name, answers.department_name, answers.price, answers.shipping, answers.stock_quantity, answers.wholesale_cost);
    })
}

function addNewItem(product_name, department_name, price, shipping, stock_quantity, wholesale_cost) {
  console.log("Inserting a new item.... \n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name,
      department_name,
      price,
      shipping,
      stock_quantity,
      wholesale_cost,
    },
    function (err, res) {
      if (err) {
        console.log(err);
      }
      // console.log(res);
    }
  );
  // logs the actual query being run
  console.log(query.sql);
  connection.end();
}
