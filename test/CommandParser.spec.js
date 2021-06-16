const expect = require('chai').expect;
const CommandParser = require('../CommandParser');

describe('CommandParser', function() {
  describe('parse', function() {
    it('should register all the given commands inside the manager context', function() {
      const instruction = 'CreaTE some/folder nonUsedParam';
      const instance = new CommandParser();
      const response = instance.parse(instruction);

      expect(response).to.be.instanceof(Object);
      expect(response.command).to.be.equal('CREATE');
      expect(response.args.length).to.be.equal(2);
      expect(response.args[0]).to.be.equal('some/folder');
      expect(response.args[1]).to.be.equal('nonUsedParam');
    });
  });
});
