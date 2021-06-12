class CommandParser {
  parse(instruction) {
    return instruction.split(' ');
  }
}

module.exports = CommandParser;
