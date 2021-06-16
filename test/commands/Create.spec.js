const expect = require("chai").expect;
const Create = require("../../commands/Create");

describe("Commands/", function () {
  describe("Create", function () {
    describe("do", function () {
      it("should return an error if there is no arguments", function () {
        const error = () => Create.do({}, []);

        expect(error).to.throw('CREATE command needs one argument.');
      });

      it("should return an error if the new folder path is invalid", function () {
        const path = 'nonExistentFolder/inside';
        const error = () => Create.do({}, [path]);

        expect(error).to.throw(`Directory path ${path} invalid.`);
      });

      it("should return an error if the new folder name is blank", function () {
        const path = 'folder//inside';
        const directory = {
          folder: {}
        };
        const error = () => Create.do(directory, [path]);

        expect(error).to.throw('Directory name invalid.');
      });

      it("should update the directory", function () {
        const path = 'folder/inside';
        const directory = {
          folder: {}
        };
        const expectedResult = {
          folder: {
            inside: {}
          }
        };

        Create.do(directory, [path]);

        expect(directory).to.eql(expectedResult);
      });
    });
  });
});
