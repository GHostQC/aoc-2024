const fs = require('fs');

const readInput = (file = 'input.txt', encoding = 'utf8') => {
  return fs.readFileSync(file, encoding, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

module.exports = {
  readInput
}