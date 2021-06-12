const Command = require("./Command");

class Move extends Command {
  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   * @param {Array} args Arguments that the command would use.
   *
   * Will move a folder in to the new expected path.
   * Will delete a folder given an specific path
   */
  static do(directory, args) {
    if (args.length === 0) {
      console.log('MOVE command needs one arguments.');
      return false;
    }

    const originPath = args[0].split('/');
    const targetPath = args[1].split('/');
    const folder = this.getAndDelete(directory, originPath);

    this.assign(directory, targetPath, folder);
  }

  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   * @param {Array} path Path to follow inside the virtual directory.
   * @returns {Object} This would be the value and name of the folder
   *  that want to be moved.
   *
   * This function will return the information fo the folder that is
   * targeted to be moved and will delete it from it's original position.
   */
  static getAndDelete(directory, path) {
    const dirLength = path.length;
    let pastFolder = directory;
    let folderName = 'root';
    let folder = {};

    for (let count = 0; count < dirLength; count++) {
      folderName = path[count];

      if (!pastFolder) {
        console.log(`Directory path ${path.joing('/')} invalid.`);
        break;
      } else if (folderName === '') {
        console.log('Directory name invalid.');
        break;
      };

      if (count === dirLength - 1) {
        folder = {
          name: folderName,
          data: pastFolder[folderName]
        };
        delete pastFolder[folderName];
      } else {
        pastFolder = pastFolder[folderName];
      }
    }

    return folder;
  }

  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   * @param {Array} path Path to follow inside the virtual directory.
   * @param {Object} folder Folder data to be inserted in the new position.
   *
   * This method will insert the folder information inside the new given
   * path.
   */
  static assign(directory, path, folder) {
    const dirLength = path.length;
    let pastFolder = directory;
    let folderName = 'root';

    for (let count = 0; count < dirLength; count++) {
      folderName = path[count];

      if (!pastFolder) {
        console.log(`Directory path ${path.joing('/')} invalid.`);
        break;
      } else if (folderName === '') {
        console.log('Directory name invalid.');
        break;
      };

      if (count === dirLength - 1) {
        const currentFolder = {
          ...pastFolder[folderName],
          [folder.name]: folder.data
        };
        pastFolder[folderName] = currentFolder;
      } else {
        pastFolder = pastFolder[folderName];
      }
    }
  }
}

module.exports = Move;
