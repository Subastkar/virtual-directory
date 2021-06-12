const Command = require("./Command");

class List extends Command {
  /**
   *  Will print the actual state of the directoty
   *
   */
  static do(directory) {
    console.log('\nDirectory status -----------------');
    this.iterate(directory);
    return true;
  }

  static iterate(directory, deep = 0) {
    Object.keys(directory).forEach((rootKey) => {
      const item = directory[rootKey];

      this.print(deep, rootKey);

      if (typeof item === 'object') {
        return this.iterate(item, deep + 1);
      }
    });
  }

  static print(deep, string) {
    const prefix = '.'.repeat(deep);
    console.log(`${prefix}${string}`);
  }
}

module.exports = List;
