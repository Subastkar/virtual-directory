const { expect } = require('chai');
const sinon = require('sinon');
const List = require('../../../src/commands/List');

describe('Commands/', () => {
  describe('List', () => {
    describe('do', () => {
      let iterateStub;

      beforeEach(() => {
        iterateStub = sinon.stub(List, 'iterate').returns({});
      });

      afterEach(() => {
        iterateStub.restore();
      });

      it('should return an error if there was an issue calling iterate', () => {
        const errorMsg = 'New error.';

        iterateStub.restore();
        iterateStub = sinon.stub(List, 'iterate').throws(() => new Error(errorMsg));
        const error = () => List.do({});

        expect(error).to.throw(errorMsg);
        expect(iterateStub.callCount).to.be.equal(1);
      });

      it('should return a success if there was no issue', () => {
        const response = List.do({});

        expect(response).to.be.true;
        expect(iterateStub.callCount).to.be.equal(1);
      });
    });

    describe('do', () => {
      const sandbox = sinon.createSandbox();
      let printStub;

      beforeEach(() => {
        sandbox.spy(List, 'iterate');
        printStub = sinon.stub(List, 'print').returns({});
      });

      afterEach(() => {
        printStub.restore();
        sandbox.restore();
      });

      it('should return an error if there was an issue calling print', () => {
        const errorMsg = 'New error.';
        const directory = {
          first: {},
          second: {
            internal: {},
          },
        };

        printStub.restore();
        printStub = sinon.stub(List, 'print').throws(() => new Error(errorMsg));
        const error = () => List.do(directory);

        expect(error).to.throw(errorMsg);
        expect(printStub.callCount).to.be.equal(1);
        expect(List.iterate.callCount).to.be.equal(1);
      });

      it('should return a success if there was no issue', () => {
        const directory = {
          first: {},
          second: {
            internal: {},
          },
        };

        List.do(directory);

        expect(printStub.callCount).to.be.equal(3);
        expect(printStub.args[0]).to.be.eql([0, 'first']);
        expect(printStub.args[1]).to.be.eql([0, 'second']);
        expect(printStub.args[2]).to.be.eql([1, 'internal']);
        expect(List.iterate.callCount).to.be.equal(4);
      });
    });
  });
});
