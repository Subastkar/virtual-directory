const fs = require('fs');

class FileReader {
  read(path) {
    let data = '';
    try {
      data = fs.readFileSync(path, 'utf8')
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('File not found.');
      } else {
        console.error(error);
      }
    }

    return data;
  }
}

module.exports = FileReader;
