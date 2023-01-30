let mysql = require('mysql');

module.exports = {
  DB: class {
    #credentials

    constructor(credentials) {
      this.#credentials = credentials;

      this.connection = mysql.createConnection(credentials);
      this.connection.connect( function(err) {
        if(err) throw err;
        else console.log("Connected to the database on LOCALHOST!");
      })
    }
    
   insert(table, values) {
      this.connection.query(`INSERT INTO ${table} VALUES(${JSON.stringify(values)})`);    
    }
    // retrieve();

    close() {
      this.connection.end();
    }
  }
}