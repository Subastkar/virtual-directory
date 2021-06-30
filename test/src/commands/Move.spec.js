const { expect } = require('chai');
const sinon = require('sinon');
const Move = require('../../../src/commands/Move');

describe('Commands/', () => {
  describe('Move', () => {
    describe('do', () => {
      let getAndDeleteStub;
      let assignStub;

      beforeEach(() => {
        getAndDeleteStub = sinon.stub(Move, 'getAndDelete').returns({});
        assignStub = sinon.stub(Move, 'assign').returns({});
      });

      afterEach(() => {
        getAndDeleteStub.restore();
        assignStub.restore();
      });

      it('should return an error if there is no arguments', () => {
        const error = () => Move.do({}, []);

        expect(error).to.throw('MOVE command needs two arguments.');
      });

      it('should return an error if only one argument is passed', () => {
        const error = () => Move.do({}, ['first/path']);

        expect(error).to.throw('MOVE command needs two arguments.');
      });

      it('should return an error if there was an issue calling getAndDelete', () => {
        const firstPath = 'first/path';
        const secondPath = 'second/path';
        const errorMsg = 'New error.';

        getAndDeleteStub.restore();
        getAndDeleteStub = sinon.stub(Move, 'getAndDelete').throws(() => new Error(errorMsg));
        const error = () => Move.do({}, [firstPath, secondPath]);

        expect(error).to.throw(errorMsg);
        expect(getAndDeleteStub.callCount).to.be.equal(1);
        expect(assignStub.called).to.be.false;
      });

      it('should return an error if there was an issue calling assign', () => {
        const firstPath = 'first/path';
        const secondPath = 'second/path';
        const errorMsg = 'New error.';

        assignStub.restore();
        assignStub = sinon.stub(Move, 'assign').throws(() => new Error(errorMsg));
        const error = () => Move.do({}, [firstPath, secondPath]);

        expect(error).to.throw(errorMsg);
        expect(getAndDeleteStub.callCount).to.be.equal(1);
        expect(assignStub.callCount).to.be.equal(1);
      });
    });

    describe('getAndDelete', () => {
      it('should return an error if the new folder name is blank', () => {
        const path = ['nonExistentFolder', 'inside'];
        const error = () => Move.getAndDelete({}, path);

        expect(error).to.throw(`Cannot move ${path.join('/')} - ${path[0]} does not exist.`);
      });

      it('should return an error if the new folder path is invalid', () => {
        const path = ['folder', '', 'inside'];
        const directory = {
          folder: {},
        };
        const error = () => Move.getAndDelete(directory, path);

        expect(error).to.throw('Directory name invalid.');
      });

      it('should update the directory to remove the folder', () => {
        const path = ['folder', 'moving'];
        const directory = {
          folder: {
            inside: {},
            moving: {
              this: {},
            },
          },
        };
        const expectedResult = {
          folder: {
            inside: {},
          },
        };
        const expectedResponse = {
          name: 'moving',
          data: {
            this: {},
          },
        };

        const folder = Move.getAndDelete(directory, path);

        expect(directory).to.eql(expectedResult);
        expect(folder.name).to.equal(expectedResponse.name);
        expect(folder.data).to.eql(expectedResponse.data);
      });
    });

    describe('assign', () => {
      it('should return an error if the new folder name is blank', () => {
        const path = ['nonExistentFolder', 'inside'];
        const folder = {
          name: 'moving',
          data: {
            this: {},
          },
        };
        const error = () => Move.assign({}, path, folder);

        expect(error).to.throw(`Cannot move ${path.join('/')} - ${path[0]} does not exist.`);
      });

      it('should return an error if the new folder path is invalid', () => {
        const path = ['folder', '', 'inside'];
        const directory = {
          folder: {},
        };
        const folder = {
          name: 'moving',
          data: {
            this: {},
          },
        };
        const error = () => Move.assign(directory, path, folder);

        expect(error).to.throw('Directory name invalid.');
      });

      it('should update the directory to remove the folder', () => {
        const path = ['folder', 'inside'];
        const directory = {
          folder: {
            inside: {},
          },
        };
        const folder = {
          name: 'moving',
          data: {
            this: {},
          },
        };
        const expectedResult = {
          folder: {
            inside: {
              moving: {
                this: {},
              },
            },
          },
        };

        Move.assign(directory, path, folder);

        expect(directory).to.eql(expectedResult);
      });
    });
  });
});
