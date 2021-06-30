const { expect } = require('chai');
const Create = require('../../../src/commands/Create');

describe('Commands/', () => {
  describe('Create', () => {
    describe('do', () => {
      it('should return an error if there is no arguments', () => {
        const error = () => Create.do({}, []);

        expect(error).to.throw('CREATE command needs one argument.');
      });

      it('should return an error if the new folder path is invalid', () => {
        const invalidFolder = 'nonExistentFolder';
        const path = `${invalidFolder}/inside`;
        const error = () => Create.do({}, [path]);

        expect(error).to.throw(`Cannot create ${path} - ${invalidFolder} does not exist.`);
      });

      it('should return an error if the new folder name is blank', () => {
        const path = 'folder//inside';
        const directory = {
          folder: {},
        };
        const error = () => Create.do(directory, [path]);

        expect(error).to.throw('Directory name invalid.');
      });

      it('should update the directory', () => {
        const path = 'folder/inside';
        const directory = {
          folder: {},
        };
        const expectedResult = {
          folder: {
            inside: {},
          },
        };

        Create.do(directory, [path]);

        expect(directory).to.eql(expectedResult);
      });
    });
  });
});
