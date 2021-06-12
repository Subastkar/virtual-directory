class CommandParser {
  parse(instruction) {
    const [ command, ...args ] = instruction.split(' ');

    return {
      command: command.toUpperCase(),
      args
    };
  }
}

module.exports = CommandParser;
