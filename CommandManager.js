class CommandManager {
  constructor(commandsDirectory) {
    const commands = require(commandsDirectory);

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

    if (cmd) {
      cmd.do(this.directory, args);
    } else {
      console.log(`Command ${cmdName} does not exists.`);
    }
  }
}

module.exports = CommandManager;
