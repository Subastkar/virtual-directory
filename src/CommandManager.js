class CommandManager {
  constructor(commands) {
    this.register(commands);
  }

  /**
   * @param {Array} Commands List of commands.
   * This method will register all the given
   * commands in the context of it.
   */
  register(commands) {
    const self = this;

    Object.keys(commands).forEach((command) => {
      const cmd = commands[command];

      self[command] = cmd;
    });
  }

  /**
   * @param {String} cmdName Name f the command to execute.
   * @param {Array} args List of arguments to be passed to the given command.
   * This method is in charge of executing each command.
   */
  execute(directory, cmdName, args) {
    if (cmdName === '') {
      return false;
    }

    const cmd = this[cmdName];
    let updatedDirectory = {};

    if (!cmd) {
      console.log(`Command ${cmdName} does not exists.`);
    }

    try {
      updatedDirectory = cmd.do(directory, args);
    } catch (error) {
      console.log(error.message);
    }

    return updatedDirectory;
  }
}

module.exports = CommandManager;
