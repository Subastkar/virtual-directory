const expect = require("chai").expect;
const sinon = require("sinon");
const Move = require("../../commands/Move");

describe("Commands/", function () {
  describe("Move", function () {
    describe("do", function () {
      let getAndDeleteStub;
      let assignStub;

      beforeEach(function () {
        getAndDeleteStub = sinon.stub(Move, 'getAndDelete').returns({});
        assignStub = sinon.stub(Move, 'assign').returns({});
      });

      afterEach(function () {
        getAndDeleteStub.restore();
        assignStub.restore();
      });

      it("should return an error if there is no arguments", function () {
        const error = () => Move.do({}, []);

        expect(error).to.throw('MOVE command needs two arguments.');
      });

      it("should return an error if only one argument is passed", function () {
        const error = () => Move.do({}, ['first/path']);

        expect(error).to.throw('MOVE command needs two arguments.');
      });

      it("should return an error if there was an issue calling getAndDelete", function () {
        const firstPath = 'first/path';
        const secondPath = 'second/path';
        const errorMsg = 'New error.'

        getAndDeleteStub.restore();
        getAndDeleteStub = sinon.stub(Move, "getAndDelete").throws(() => {
          return new Error(errorMsg);
        });
        const error = () => Move.do({}, [firstPath, secondPath]);

        expect(error).to.throw(errorMsg);
        expect(getAndDeleteStub.callCount).to.be.equal(1);
        expect(assignStub.called).to.be.false;
      });

      it("should return an error if there was an issue calling assign", function () {
        const firstPath = 'first/path';
        const secondPath = 'second/path';
        const errorMsg = 'New error.'

        assignStub.restore();
        assignStub = sinon.stub(Move, "assign").throws(() => {
          return new Error(errorMsg);
        });
        const error = () => Move.do({}, [firstPath, secondPath]);

        expect(error).to.throw(errorMsg);
        expect(getAndDeleteStub.callCount).to.be.equal(1);
        expect(assignStub.callCount).to.be.equal(1);
      });
    });

    describe("getAndDelete", function () {
      it("should return an error if the new folder name is blank", function () {
        const path = ['nonExistentFolder', 'inside'];
        const error = () => Move.getAndDelete({}, path);

        expect(error).to.throw(`Directory path ${path.join('/')} invalid.`);
      });

      it("should return an error if the new folder path is invalid", function () {
        const path = ['folder', '', 'inside'];
        const directory = {
          folder: {}
        };
        const error = () => Move.getAndDelete(directory, path);

        expect(error).to.throw('Directory name invalid.');
      });

      it("should update the directory to remove the folder", function () {
        const path = ['folder', 'moving'];
        const directory = {
          folder: {
            inside: {},
            moving: {
              this: {}
            }
          }
        };
        const expectedResult = {
          folder: {
            inside: {}
          }
        };
        const expectedResponse = {
          name: 'moving',
          data: {
            this: {}
          }
        };

        const folder = Move.getAndDelete(directory, path);

        expect(directory).to.eql(expectedResult);
        expect(folder.name).to.equal(expectedResponse.name);
        expect(folder.data).to.eql(expectedResponse.data);
      });
    });

    describe("assign", function () {
      it("should return an error if the new folder name is blank", function () {
        const path = ['nonExistentFolder', 'inside'];
        const folder = {
          name: 'moving',
          data: {
            this: {}
          }
        };
        const error = () => Move.assign({}, path, folder);

        expect(error).to.throw(`Directory path ${path.join('/')} invalid.`);
      });

      it("should return an error if the new folder path is invalid", function () {
        const path = ['folder', '', 'inside'];
        const directory = {
          folder: {}
        };
        const folder = {
          name: 'moving',
          data: {
            this: {}
          }
        };
        const error = () => Move.assign(directory, path, folder);

        expect(error).to.throw('Directory name invalid.');
      });

      it("should update the directory to remove the folder", function () {
        const path = ['folder', 'inside'];
        const directory = {
          folder: {
            inside: {}
          }
        };
        const folder = {
          name: 'moving',
          data: {
            this: {}
          }
        };
        const expectedResult = {
          folder: {
            inside: {
              moving: {
                this: {}
              }
            }
          }
        };

        Move.assign(directory, path, folder);

        expect(directory).to.eql(expectedResult);
      });
    });
  });
});
