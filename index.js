const CommandParser = require('./CommandParser');
const CommandManager = require('./CommandManager');
const instructions = [
  'CREATE fruits',
  'CREATE vegetables',
  'CREATE grains',
  'CREATE fruits/apples',
  'CREATE fruits/apples/fuji',
  'LIST',
  'CREATE grains/squash',
  'MOVE grains/squash vegetables',
  'LIST',
  //'CREATE foods',
  //'MOVE grains foods',
  //'MOVE fruits foods',
  //'MOVE vegetables foods',
  //'LIST',
  //'DELETE fruits/apples',
  //'DELETE foods/fruits/apples',
  //'LIST'
]

/**
 *  Main function:
 *  This function contains the commands to run the main
 *  functionality of the exercise.
 */
const run = () => {
  const commandParser = new CommandParser();
  const manager = new CommandManager('./commands');

  instructions.forEach((instruction) => {
    const [ command, ...args ] = commandParser.parse(instruction);

    manager.execute(command, args);
  });
};

run();
