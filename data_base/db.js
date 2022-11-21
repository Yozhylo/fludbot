let mysql = require('mysql');
const db = require('./db_config.json');

let connection = mysql.createConnection(db);

connection.connect( function(err) {
  if(err) throw err;
  else console.log("Connected to the data base on LOCALHOST!");
});

