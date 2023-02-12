const { DB } = require('../classes/db.js');
const path = require('node:path')
const fs = require('node:fs');

// async function callbackToRemove(err, file)
// {
//   if(err) {
//     console.log(err);
//     throw err;
//   } else {
//     const credentials = require('../.data-base/config.json');
//     const db = new DB(credentials);
    
//     const query = `DELETE FROM file WHERE Nickname = '${file.Nickname}'`;
//     db.connection.query(query, () => console.log('Removed from table'));

//     db.close();
//   }
// }

async function deleteFile(err, file) {
  if(err) {
    console.log(err);
    throw err;
  } else {
      // console.log(result);
      const fileLocation = path.join('.data-base','file-storage', file.name + file.extension.format);
      console.log('Deleting file');
      fs.unlink(fileLocation, err => {
        if(err) {
          console.error(err);
          throw err;
        } else {
          console.log(`${fileLocation} was deleted.`);
        }
      });
      // callback(err);
  }
}

// async function deleteFile(err, file) {
//   if(err) {
//     console.log(err);
//     throw err;
//   } else {
//       // console.log(result);
//       const fileLocation = path.join('.data-base','file-storage', file.name + file.extension.format);
//       console.log('Deleting file');
//       unlink(fileLocation);
//       // callback(err);
//   }
// }

module.exports = deleteFile;