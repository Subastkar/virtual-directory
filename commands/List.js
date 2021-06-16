const Command = require("./Command");

class List extends Command {
  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   *
   * Will print the actual state of the directoty
   */
  static do(directory) {
    this.iterate(directory);
    console.log('\n');
    return true;
  }

  /**
   *
   * @param {Object} directory Current state of the virtual directory.
   * @param {Integer} deep Value that associates with how deep we are in the root object.
   *
   * This function allow to iterate nested objects.
   */
  static iterate(directory, deep = 0) {
    Object.keys(directory).sort().forEach((rootKey) => {
      const item = directory[rootKey];

      this.print(deep, rootKey);

      if (typeof item === 'object') {
        return this.iterate(item, deep + 1);
      }
    });
  }

  /**
   *
   * @param {Integer} deep Value that associates with how deep we are in the root object.
   * @param {String} string Data to be printed
   *
   * Prints an output on the console.
   */
  static print(deep, string) {
    const prefix = ' '.repeat(deep);
    console.log(`${prefix}${string}`);
  }
}

module.exports = List;
