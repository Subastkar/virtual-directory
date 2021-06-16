const expect = require("chai").expect;
const Delete = require("../../commands/Delete");

describe("Commands/", function () {
  describe("Delete", function () {
    describe("do", function () {
      it("should return an error if there is no arguments", function () {
        const error = () => Delete.do({}, []);

        expect(error).to.throw('DELETE command needs one argument.');
      });

      it("should return an error if the new folder path is invalid", function () {
        const path = 'nonExistentFolder/inside';
        const error = () => Delete.do({}, [path]);

        expect(error).to.throw(`Directory path ${path} invalid.`);
      });

      it("should return an error if the new folder name is blank", function () {
        const path = 'folder//inside';
        const directory = {
          folder: {}
        };
        const error = () => Delete.do(directory, [path]);

        expect(error).to.throw('Directory name invalid.');
      });

      it("should update the directory to remove the folder", function () {
        const path = 'folder/notDesired';
        const directory = {
          folder: {
            inside: {},
            notDesired: {
              nonImportant: {}
            }
          }
        };
        const expectedResult = {
          folder: {
            inside: {}
          }
        };

        Delete.do(directory, [path]);

        expect(directory).to.eql(expectedResult);
      });
    });
  });
});
