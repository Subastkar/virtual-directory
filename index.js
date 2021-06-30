const CommandParser = require('./src/CommandParser');
const CommandManager = require('./src/CommandManager');
const Parser = require('./src/fileParser/Parser');
const FileReader = require('./src/fileParser/FileReader');
const commandsDirectory = require('./src/commands');

/**
 *  Main function:
 *  This function contains the commands to run the main
 *  functionality of the exercise.
 */
const run = async () => {
  const parser = new Parser(new FileReader());
  const manager = new CommandManager(commandsDirectory);

  const instructions = await parser.parse(process.argv[2]);
  instructions.forEach((instruction) => {
    const { command, args } = CommandParser.parse(instruction);

    manager.execute(command, args);
  });
};

(async() => {
  await run();
})();
