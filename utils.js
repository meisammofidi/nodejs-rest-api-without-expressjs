const fs = require('fs');

function writeDataToFile(fileName, data) {
  fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8', (err) => {
    if (err) console.log('Writing into file failed.');
  });
}

async function getBodyRequest(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getBodyRequest,
};
