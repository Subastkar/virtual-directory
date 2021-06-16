const expect = require("chai").expect;
const sinon = require('sinon');
const List = require("../../commands/List");

describe("Commands/", function () {
  describe("List", function () {
    describe("do", function () {
      let iterateStub;

      beforeEach(function () {
        iterateStub = sinon.stub(List, 'iterate').returns({});
      });

      afterEach(function () {
        iterateStub.restore();
      });

      it("should return an error if there was an issue calling iterate", function () {
        const errorMsg = 'New error.'

        iterateStub.restore();
        iterateStub = sinon.stub(List, "iterate").throws(() => {
          return new Error(errorMsg);
        });
        const error = () => List.do({});

        expect(error).to.throw(errorMsg);
        expect(iterateStub.callCount).to.be.equal(1);
      });

      it("should return a success if there was no issue", function () {
        const response = List.do({});

        expect(response).to.be.true;
        expect(iterateStub.callCount).to.be.equal(1);
      });
    });

    describe("do", function () {
      const sandbox = sinon.createSandbox();
      let printStub;

      beforeEach(function () {
        sandbox.spy(List, 'iterate');
        printStub = sinon.stub(List, 'print').returns({});
      });

      afterEach(function () {
        printStub.restore();
        sandbox.restore();
      });

      it("should return an error if there was an issue calling print", function () {
        const errorMsg = 'New error.'
        const directory = {
          first: {},
          second: {
            internal: {}
          }
        };

        printStub.restore();
        printStub = sinon.stub(List, "print").throws(() => {
          return new Error(errorMsg);
        });
        const error = () => List.do(directory);

        expect(error).to.throw(errorMsg);
        expect(printStub.callCount).to.be.equal(1);
        expect(List.iterate.callCount).to.be.equal(1);
      });

      it("should return a success if there was no issue", function () {
        const directory = {
          first: {},
          second: {
            internal: {}
          }
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
