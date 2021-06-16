const expect = require('chai').expect;
const sinon = require('sinon');
const CommandManager = require('../CommandManager');

describe('CommandManager', function() {
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  describe('register', function() {
    it('should register all the given commands inside the manager context', function() {
      const instance = new CommandManager('./test/mocks/commands');

      expect(instance.testCommand.do()).to.be.true;
    });
  });

  describe('execute', function() {
    it('should not return a value when the command is an empty string', function() {
      const instance = new CommandManager('./test/mocks/commands');
      const response = instance.execute('', []);

      expect(response).to.be.false;
    });

    it('should not return a value when the command is an empty string', function() {
      const instance = new CommandManager('./test/mocks/commands');

      sandbox.spy(instance.testCommand, 'do');
      const response = instance.execute('testCommand', []);

      expect(instance.testCommand.do.callCount).to.be.equal(1);
    });
  });
});
