const Command = require("./Command");

class Delete extends Command {
  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   * @param {Array} args Arguments that the command would use.
   *
   * Will delete a folder given an specific path
   */
  static do(directory, args) {
    if (args.length === 0) {
      throw new Error("DELETE command needs one argument.");
    }

    const path = args[0].split('/');
    const dirLength = path.length;
    let pastFolder = directory;
    let folderName = 'root';

    for (let count = 0; count < dirLength; count++) {
      folderName = path[count];

      if (!pastFolder) {
        throw new Error(`Directory path ${args[0]} invalid.`);
      } else if (folderName === '') {
        throw new Error('Directory name invalid.');
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
