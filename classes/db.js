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
    
   async insert(fileReference, fileName, fileNick, fileDescription, fileFormat) {
    let query = `
      INSERT INTO file(fk_extension_id, Source, Name, Nickname, Description)
      SELECT id, '${fileReference}', '${fileName}', '${fileNick}', '${fileDescription}'
      FROM extension
      WHERE format = '${fileFormat}';`

    this.connection.query(query, (err, result) => {
      if(err) {
        console.error(err)
        return err;
      }
      else {
        console.log(result);
        console.log(`QUERY\n ${query}\n\n---\n`);
        console.log(`Query finished!`);
        return;
      }
    });    
  }
    // retrieve();
    // show(table) {
    
    // }
    close() {
      this.connection.end();
    }
  }
}