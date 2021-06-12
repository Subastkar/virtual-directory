const Command = require("./Command");

class Move extends Command {
  /**
   *  Will move a folder in to the new expected path.
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
