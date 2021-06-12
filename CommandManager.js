class CommandManager {
  constructor(commandsDirectory) {
    const commands = require(commandsDirectory);

    this.directory = {};
    this.register(commands);
  }

  register(commands) {
    const self = this;

    Object.keys(commands).forEach((command) => {
      const cmd = commands[command];

      self[command] = cmd;
    });
  }

  execute(cmdName, args) {
    const cmd = this[cmdName];

    cmd.do(this.directory, args);
  }
}

module.exports = CommandManager;
