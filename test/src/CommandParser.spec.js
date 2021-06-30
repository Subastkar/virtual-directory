const { expect } = require('chai');
const CommandParser = require('../../src/CommandParser');

describe('CommandParser', () => {
  describe('parse', () => {
    it('should register all the given commands inside the manager context', () => {
      const instruction = 'CreaTE some/folder nonUsedParam';
      const response = CommandParser.parse(instruction);

      expect(response).to.be.instanceof(Object);
      expect(response.command).to.be.equal('CREATE');
      expect(response.args.length).to.be.equal(2);
      expect(response.args[0]).to.be.equal('some/folder');
      expect(response.args[1]).to.be.equal('nonUsedParam');
    });
  });
});
