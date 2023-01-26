const fs = require('node:fs');
const https = require('node:https');
const path = require('node:path');
const Stream = require('node:stream').Transform;

async function download(reference, name) {
  console.log(`Started downloading file from ${reference}`)

  https.get(reference, responce => {
    if (responce.statusCode === 200) {
      let data = new Stream();

      responce.on("data", chunk => {
        data.push(chunk);
      });

      responce.on("end", () => {
        let dirName = path.join('.data-base', 'file-storage');
        let fileDestination = path.join(dirName, '/', name);
        
        // check, if file already exists
        while(fs.existsSync(fileDestination)) {
          fileDestination = path.join(dirName, path.basename(fileDestination, path.extname(fileDestination)) + ' (copy)' + path.extname(fileDestination));
          console.log('File with this name already exists. Saving as copy');
        }
        fs.writeFileSync(fileDestination, data.read());
        console.log(`Download finished. Saved as:\n ${path.basename(fileDestination)}`)
      });
    }
  });
};

module.exports = download;