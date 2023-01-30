const fs = require('node:fs');
const https = require('node:https');
const path = require('node:path');
const Stream = require('node:stream').Transform;

async function download(source, name) {
  https.get(source, responce => {
    responce.on("error", err => {
      console.error(err);
      throw err;
    })
    if (responce.statusCode === 200) {
      let data = new Stream();
      console.log(`Started downloading file from ${source}`)

      responce.on("data", chunk => {
        data.push(chunk);
      });

      responce.on("end", function save() {
        let dirName = path.join('.data-base', 'file-storage');
        let fileDestination = path.join(dirName, name);
        
        // check, if file already exists
        while(fs.existsSync(fileDestination)) {
          fileDestination = path.join(dirName, path.basename(fileDestination, path.extname(fileDestination)) + ' (copy)' + path.extname(fileDestination));
          console.log('File with this name already exists. Saving as copy');
        }
        // save file
        fs.writeFile(fileDestination, data.read(), (err) => {
          if(err) {
            console.error(err)
            throw err;
          }
          else {
          console.log(`Download finished. Saved as:\n ${path.basename(fileDestination)}`)
          }
        });
      });
    }
  });
};

module.exports = download;