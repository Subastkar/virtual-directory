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
