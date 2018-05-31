# Command Line interface Ecommerce application

#### This application connects to a database and tracks sales, inventory and department profit and losses.

### Instructions

1. To run this app, you'll need to install the following Node packages.

   * [CLI Table](https://www.npmjs.com/package/cli-table) run _npm install cli-table_ 
   
   * [inquirer](https://www.npmjs.com/package/inquirer) run _npm install inquirer_ 
   
   * [mysql](https://www.npmjs.com/package/mysql) run _npm install mysql_ 

2. You will need to set up the database. Use the file named "mystore_bd-SETUP.sql" located in this repo.

3. Once you have your database set up, you can edit the configs at the top of the files list below for your specific environment. 

    _Edit lines 6 to 16 in "app_customer.js" and "app_supervisor.js"_

```javascript
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "mystore_db"
```

4. Once your files are set up you can start using the app.

5. Explore the functionaliy of the Customers area by running the command " _node app_customer.js_ "

### Customer Area

![app_customer.gif](images/app_customer.gif?raw=true "Customer Area")

6. Explore the functionaliy of the Customers area by running the command " _node app_supervisor.js_ "

### Supervisor Area

![app_supervisor.gif](images/app_supervisor.gif?raw=true "Supervisor Area")

