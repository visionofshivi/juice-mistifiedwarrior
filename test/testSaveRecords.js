const fs = require('fs');
const assert = require('assert');

const {
  converter,
  loadPreviousData,
  upDateRecords,
  writeRecords,
  showOutput,
} = require('../src/saveRecords');

const fakeReadFileSync = (fileName, encoding) =>
  `[{"--beverage": "mango","--qty": "1","--id": "1111","--date": "2020-04-28T18:05:25.979Z"}]`;

describe('SaveRecords', () => {
  describe('loadPreviousData', () => {
    it('Should give the previous records', () => {
      const readFileSync = fs.readFileSync;
      fs.readFileSync = fakeReadFileSync;
      const actual = loadPreviousData();
      const expected = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      assert.deepStrictEqual(actual, expected);
      fs.readFileSync = readFileSync;
    });
  });

  describe('writeRecords', () => {
    it('Should give the previous records', () => {
      const writeFileSync = fs.readFileSync;
      fs.writeFileSync = () => {};
      const actual = writeRecords({'--id': 123});
      assert.deepStrictEqual(actual, 'Transaction Recorded:');
      fs.writeFileSync = writeFileSync;
    });
  });
});
