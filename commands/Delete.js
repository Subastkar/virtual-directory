const Command = require("./Command");

class Delete extends Command {
  /**
   *  Will delete a folder given an specific path
   */
  static do(directory, args) {
    if (args.length === 0) {
      console.log('MOVE command needs one arguments.');
      return false;
    }

    const path = args[0].split('/');
    const dirLength = path.length;
    let pastFolder = directory;
    let folderName = 'root';

    for (let count = 0; count < dirLength; count++) {
      folderName = path[count];

      if (!pastFolder) {
        console.log(`Directory path ${args[0]} invalid.`);
        break;
      } else if (folderName === '') {
        console.log('Directory name invalid.');
        break;
      };

      if (count === dirLength - 1) {
        delete pastFolder[folderName];
        break;
      }

      pastFolder = pastFolder[folderName];
    }
  }
}

module.exports = Delete;
