class CommandManager {
  constructor(commands) {
    this.directory = {};
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
  execute(cmdName, args) {
    if (cmdName === '') {
      return false;
    }

    const cmd = this[cmdName];

    if (!cmd) {
      console.log(`Command ${cmdName} does not exists.`);
    }

    try {
      cmd.do(this.directory, args);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = CommandManager;
