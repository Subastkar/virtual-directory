const { expect } = require('chai');
const sinon = require('sinon');
const mockCommands = require('../mocks/commands');
const CommandManager = require('../../src/CommandManager');

describe('CommandManager', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('register', () => {
    it('should register all the given commands inside the manager context', () => {
      const instance = new CommandManager(mockCommands);

      expect(instance.testCommand.do()).to.be.true;
    });
  });

  describe('execute', () => {
    it('should not return a value when the command is an empty string', () => {
      const instance = new CommandManager(mockCommands);
      const response = instance.execute('', []);

      expect(response).to.be.false;
    });

    it('should not return a value when the command is an empty string', () => {
      const instance = new CommandManager(mockCommands);

      sandbox.spy(instance.testCommand, 'do');
      instance.execute('testCommand', []);

      expect(instance.testCommand.do.callCount).to.be.equal(1);
    });
  });
});
