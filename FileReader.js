const fs = require('fs');

class FileReader {
  /**
   * @param {String} path Path were to find the file.
   * @returns {String} File string vlue
   * This method reads a given file and returns it string value.
   */
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
