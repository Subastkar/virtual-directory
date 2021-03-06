class CommandParser {
  /**
   * @param {String} instruction The complete command execution.
   * @return {Object} Command value and arguements.
   * This method will split the command in order to be able to return
   * the executing command and it's argument
   */
  static parse(instruction) {
    // Print out executed instruction
    console.log(instruction);
    const [command, ...args] = instruction.split(' ');

    return {
      command: command.toUpperCase(),
      args,
    };
  }
}

module.exports = CommandParser;
