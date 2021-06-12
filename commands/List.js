const Command = require("./Command");

class List extends Command {
  /**
   *  Will print the actual state of the directoty
   *
   */
  static do(directory) {
    console.log(directory);
    return true;
  }
}

module.exports = List;
