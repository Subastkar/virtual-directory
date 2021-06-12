const CommandParser = require('./CommandParser');
const CommandManager = require('./CommandManager');
const Parser = require('./Parser');
const FileReader = require('./FileReader');

/**
 *  Main function:
 *  This function contains the commands to run the main
 *  functionality of the exercise.
 */
const run = async () => {
  const parser = new Parser(new FileReader());
  const commandParser = new CommandParser();
  const manager = new CommandManager('./commands');

  const instructions = await parser.parse(process.argv[2]);
  instructions.forEach((instruction) => {
    const { command, args } = commandParser.parse(instruction);

    manager.execute(command, args);
  });
};

(async() => {
  await run();
})();
