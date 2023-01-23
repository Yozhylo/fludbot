const fs = require('fs');
const https = require('https');
const Stream = require('stream').Transform;
const path = require('path');

const URL = "https://cdn.discordapp.com/attachments/534790246316113931/1065027017684287608/image.png"

https.get(URL, responce => {
    if (responce.statusCode === 200) {
      let img = new Stream();

      responce.on("data", chunk => {
        img.push(chunk);
      });

      responce.on("end", () => {
        let fileName = path.join(__dirname, '..', '.data-base', 'file-storage' , 'file.png');
        fs.writeFileSync(fileName, img.read());
      });
    }
});
