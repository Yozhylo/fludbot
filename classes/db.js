let mysql = require('mysql');

module.exports = {
  DB: class {
    #credentials

    constructor(credentials) {
      this.#credentials = credentials;

      this.connection = mysql.createConnection(credentials);
      this.connection.connect( function(err) {
        if(err) throw err;
        else console.log("Connected to the database");
      })
    }
    
   async insert(fileReference, fileName, fileNick, fileDescription, fileFormat) {
    const QUERY = `
      INSERT INTO file(fk_extension_id, Source, Name, Nickname, Description)
      SELECT id, '${fileReference}', '${fileName}', '${fileNick}', '${fileDescription}'
      FROM extension
      WHERE format = '${fileFormat}';`

    this.connection.query(QUERY, (err, result) => {
      if(err) {
        console.error(err);
        throw err;
      }
      else {
        console.log(result);
        console.log(`QUERY\n ${QUERY}\n\n---\n`);
        console.log(`Query finished!`);
        return;
      }
    });    
  }
  async retrieve(fileNick, callback) {
    const QUERY = `SELECT \`file\`.Name, Format, \`file\`.Description
                FROM file INNER JOIN extension
                WHERE fk_extension_id = \`extension\`.id AND Nickname = '${fileNick}';`;

    this.connection.query(QUERY, (err, result) => {
      if(err) {
        console.log(err)
        return err;
      }
      else {
        callback(err, result[0]);
      }
    })
  }
  async alter(column, identifierValue, modifiedValue, callback) {
    const QUERY = `UPDATE file
                  SET ${column} = '${modifiedValue}'
                  WHERE Nickname = '${identifierValue}'`;
    this.connection.query(QUERY, (err, result) => {
      if(err) {
        console.error(err);
        throw err;
      } else {
        console.log(result)
        callback(err, result.affectedRows)
      }
    })
  }
   async close() {
      this.connection.end();
      console.log('Connection closed')
    }
  }
}