const assert = require('assert');
const fs = require('fs');

const {performTxn} = require('../src/performTxn');
describe('PerformTxn', () => {
  describe('performTxn', () => {
    it('Should perform the save transactions', () => {
      const writeFileSync = fs.writeFileSync;
      fs.writeFileSync = () => {};

      const data = ['--beverage', 'Orange', '--qty', '2', '--id', '1111'];
      const actual = performTxn('--save', data, []);
      const expected = `Transaction Recorded:\nStudent ID,Beverage,Quantity,Date\n1111,Orange,2,${new Date()}`;
      assert.deepStrictEqual(actual, expected);

      fs.writeFileSync = writeFileSync;
    });

    it('Should perform the query transactions', () => {
      const writeFileSync = fs.writeFileSync;
      fs.writeFileSync = () => {};
      const data = ['--id', '1111'];
      const allRecords = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      const actual = performTxn('--query', data, allRecords);
      const expected = `Student ID, Beverage, Quantity, Date\n1111,mango,1,2020-04-28T18:05:25.979Z\nTotal: 1 Juice`;
      assert.deepStrictEqual(actual, expected);

      fs.writeFileSync = writeFileSync;
    });
  });
});
