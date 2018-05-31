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
        "View Profits by Department",
        "View Product Sales by product ID",
        "Add new Product",
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Product Sales by Department":
        salesByDept();
        break;

        case "View Profits by Department":
        profitsByDept();
        break;  

        

      case "View Product Sales by product ID":
        salesById();
        break;

      case "Add new Product":
        addProducts();
        break;

      case "View Products for Sale":
        viewAllProducts();
        break;  

      case "View Low Inventory":
        viewLowInventory(); // To do, build this function
        break; 
        
      case "Add to Inventory":
        addInventory(); // To do, build this function
        break;    

      }

    });
}

function viewLowInventory() {
  var tableP = new Table({head: ['Name', 'Item ID', 'Stock']});
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if(err) {
      console.log(err);
    }
      for(var i =0; i < res.length; i++) {
        tableP.push(
          [res[i].product_name, res[i].item_id, res[i].stock_quantity ],
        );  
      }   
      if (res[i].stock_quantity < 100) {
        console.log(tableP.toString());

    } else {
      console.log("Looks like stock is above 5 on all items");
    }
  
  });
  connection.end();

}








function viewAllProducts() {
    var tableP = new Table({head: ['Name', 'Price', 'Item ID', 'Stock']});
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if(err) {
        console.log(err);
      }
        for(var i =0; i < res.length; i++) {
          tableP.push(
            [res[i].product_name, res[i].price, res[i].item_id, res[i].stock_quantity ],
          ); 
        }   
        console.log(tableP.toString());  
    });
    connection.end();
  
}

function salesById() {
  var table = new Table({head: ['Item ID', 'Product', 'Department']});
  console.log("Selecting all products ...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for(var i =0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name ],
      ); 
    }   
    console.log(table.toString());   
    inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "Enter the Item ID that you would like to see sales for:",
    
    }).then(function(answer){
      var table2 = new Table({head: ['Item ID', 'Product', 'Department', 'Total Sales']});
      var query = "SELECT item_id, product_name, department_name, SUM(product_sales * products.price) FROM products WHERE item_id = ?";
      connection.query(query, [answer.action], 
        function(err, res) {
          if (err) {
            console.log(err);
          }
          // console.log(res);
          table2.push(
            [res[0].item_id, res[0].product_name, res[0].department_name, res[0]['SUM(product_sales * products.price)'] ],
          ); 
          console.log(table2.toString());   

      }
    )
    connection.end();
  });
})

}

function salesByDept() {
      var table = new Table({head: ['department_name', 'product_sales' ]});
      // Get all rows in a Department
      // Multiply sales by price for each item ID
      // Add the vales together
       connection.query("SELECT item_id, department_name, SUM(product_sales * products.price) FROM products GROUP BY department_name ORDER BY item_id ASC;", function(err, res) {
        if (err) throw err;
        // console.log(res)
        for(var i =0; i < res.length; i++) {
          table.push(
            [res[i].department_name, res[i]['SUM(product_sales * products.price)'] ] //
          ); 
        }   
        console.log(table.toString());    
      })
      connection.end();
}


function profitsByDept() {
  // instantiate
  var table = new Table({head: ['department_id', 'department_name', 'over_head_costs', 'total_sales', 'total_profit', ]});
  var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY department_name ORDER BY department_id ASC;";
   connection.query(query, function(err, res) {
    if (err) throw err;
    // console.log(res)
    
    for(var i =0; i < res.length; i++) {
      table.push(
        [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, res[i].total_profit ] //
      ); 
    }  
    console.log(table.toString()); 
   
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
