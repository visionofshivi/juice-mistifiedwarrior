const assert = require('assert');
const fs = require('fs');

const {performTxn} = require('../src/performTxn');

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
});
