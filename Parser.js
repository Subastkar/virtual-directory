class Parser {
  constructor(fileReader) {
    this.fileReader = fileReader;
  }

  async parse(filePath) {
    const text = await this.fileReader.read(filePath);

    return text.split('\n');
  }
}

module.exports = Parser;
