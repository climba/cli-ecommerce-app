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
  initialOptions();

});

function initialOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Explore store categories",
        "Find products by Category",
        "Find products by name",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore store categories":
        listCategories();
        break;

      case "Find products by Type or Category":
        searchByType();
        break;

      case "Find products by name":
        productsNameSearch();
        break;

      }
    });
}


function productsNameSearch() {
  console.log("Searching all product with similar names ...\n");
  connection.query("SELECT DISTINCT department_name FROM products;", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Department: " + res[i].department_name );
    }
    purchaseOptions();
  });
}


function listCategories() {
  console.log("Selecting all product Categories ...\n");
  connection.query("SELECT DISTINCT department_name FROM products;", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Department: " + res[i].department_name );
    }
    chooseCatagory();
  });
}

function chooseCatagory() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What Catagory would you like to purchase from?",
      choices: [
        "Purchase Digital Products",
        "Purchase Clothing Products",
        "Purchase Climbing Products",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Purchase Digital Products":
        dispDigitalProds();
        break;

      case "Purchase Clothing Products":
        dispClothingProds();
        break;

      case "Purchase Climbing Products":
        dispClimbingProds();
        break;  

      }
    });
}


function searchByType() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Explore Digital Products",
        "Explore Clothing Products",
        "Explore Climbing Products",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore Digital Products":
        dispDigitalProds();
        break;

      case "Explore Clothing Products":
        dispClothingProds();
        break;

      case "Explore Climbing Products":
        dispClimbingProds();
        break;  

      }
    });
}

function dispDigitalProds() {
  console.log("Selecting all products in Digital ...\n");
  connection.query("SELECT * FROM products WHERE department_name='Digital'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}

function dispClothingProds() {
  console.log("Selecting all products in Clothing...\n");
  connection.query("SELECT * FROM products WHERE department_name='Clothing'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}

function dispClimbingProds() {
  console.log("Selecting all products in Climbing...\n");
  connection.query("SELECT * FROM products WHERE department_name='Climbing'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}


function purchaseOptions() {
  inquirer
  .prompt({
    name: "product_name",
    type: "input",
    message: "What Product would you like to purchase?"
  })
  .then(function(answer) {
    var query = "SELECT product_name, price FROM products WHERE ?";
    connection.query(query, { product_name: answer.product_name }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("You just purchased the " + res[i].product_name + " for $" + res[i].price  );
      }
      console.log(answer.product_name);
      connection.query(
        "UPDATE products SET `stock_quantity` = `stock_quantity` -1, `product_sales` = `product_sales` +1 WHERE `product_name` =?", [answer.product_name],
        function (err, res) {
          if (err) {
            console.log(err);
          }
          // console.log(res);
        }
      ); 
      console.log("Thanks for shopping with us!");
      connection.end();
    });
  });
}
