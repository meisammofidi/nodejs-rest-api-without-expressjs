const fs = require('fs');

function writeDataToFile(fileName, data) {
  fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8', (err) => {
    if (err) console.log('Writing into file failed.');
  });
}

module.exports = {
    writeDataToFile
}
