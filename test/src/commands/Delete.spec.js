const { expect } = require('chai');
const Delete = require('../../../src/commands/Delete');

describe('Commands/', () => {
  describe('Delete', () => {
    describe('do', () => {
      it('should return an error if there is no arguments', () => {
        const error = () => Delete.do({}, []);

        expect(error).to.throw('DELETE command needs one argument.');
      });

      it('should return an error if the new folder path is invalid', () => {
        const invalidFolder = 'nonExistentFolder';
        const path = `${invalidFolder}/inside`;
        const error = () => Delete.do({}, [path]);

        expect(error).to.throw(`Cannot delete ${path} - ${invalidFolder} does not exist.`);
      });

      it('should return an error if the new folder name is blank', () => {
        const path = 'folder//inside';
        const directory = {
          folder: {},
        };
        const error = () => Delete.do(directory, [path]);

        expect(error).to.throw('Directory name invalid.');
      });

      it('should update the directory to remove the folder', () => {
        const path = 'folder/notDesired';
        const directory = {
          folder: {
            inside: {},
            notDesired: {
              nonImportant: {},
            },
          },
        };
        const expectedResult = {
          folder: {
            inside: {},
          },
        };

        Delete.do(directory, [path]);

        expect(directory).to.eql(expectedResult);
      });
    });
  });
});
