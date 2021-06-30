class Parser {
  constructor(fileReader) {
    this.fileReader = fileReader;
  }

  /**
   * @param {String} filePath Path were to find the file.
   * @returns {Array} Commands instruction list.
   * This method will split the returning file string in
   * elements that could be executed by the CommandManager.
   */
  async parse(filePath) {
    const text = await this.fileReader.read(filePath);

    return text.split('\n');
  }
}

module.exports = Parser;
