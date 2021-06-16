const Command = require("./Command");

class Create extends Command {
  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   * @param {Array} args Arguments that the command would use.
   *
   * Do will execute the main porpuse of the create command.
   *
   * This command can be desgined to be avble to create multiple
   * folders based on the number of the given arguments but this
   * increases the complexity of the code since it would an extra
   * iteration.
   */
  static do(directory, args) {
    if (args.length === 0) {
      throw new Error('CREATE command needs one argument.');
    }

    const split = args[0].split('/');
    const dirLength = split.length;
    let pastFolder = directory;

    for (let count = 0; count < dirLength; count++) {
      const folderName = split[count];

      if (!pastFolder) {
        throw new Error(`Directory path ${args[0]} invalid.`);
      } else if (folderName === '') {
        throw new Error('Directory name invalid.');
      };

      if (count === dirLength - 1) {
        pastFolder[folderName] = {};
      } else {
        pastFolder = pastFolder[folderName];
      }
    }
  }
}

module.exports = Create;
