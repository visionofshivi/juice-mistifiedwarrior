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

  describe('converter', () => {
    it('Should convert the array into objects', () => {
      const data = ['--beverage', 'Banana', '--qty', '2', '--id', '1112'];
      const actual = converter(data);
      const expected = {'--beverage': 'Banana', '--qty': '2', '--id': '1112'};
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('Update Records', () => {
    it('Should update the previous records', () => {
      const studentsTransaction = {
        '--beverage': 'Banana',
        '--qty': '2',
        '--id': '1112',
        '--date': '2020-04-30T10:47:52.538Z',
      };
      const actual = upDateRecords([], studentsTransaction);
      assert.deepStrictEqual(actual, 1);
    });
  });

  describe('showOutput', () => {
    it('Should display the output', () => {
      const response = 'Transaction Recorded:';
      const lastTxn = {
        '--beverage': 'mango',
        '--qty': '1',
        '--id': '1111',
        '--date': '2020-04-28T18:05:25.979Z',
      };
      const actual = showOutput(response, lastTxn);
      const expected = `Transaction Recorded:\nStudent ID,Beverage,Quantity,Date
1111,mango,1,2020-04-28T18:05:25.979Z`;
      assert.deepStrictEqual(actual, expected);
    });
  });
});
