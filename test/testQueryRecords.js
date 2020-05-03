const assert = require('assert');

const {filter, display} = require('../src/queryRecords');

describe('Query Records', () => {
  describe('filter', () => {
    it('Should filter from All Records', () => {
      const allRecord = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      const filterBy = {'--id': '1111'};
      const actual = filter(allRecord, filterBy);
      const expected = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      assert.deepStrictEqual(actual, expected);
    });
    it('Should filter from All Records by date and id', () => {
      const allRecord = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      const filterBy = {'--id': '1111', '--date': '2020-04-28'};
      const actual = filter(allRecord, filterBy);
      const expected = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('display', () => {
    it('Should display the output', () => {
      const records = [
        {
          '--beverage': 'mango',
          '--qty': '1',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      const actual = display(records);
      const expected = `Student ID, Beverage, Quantity, Date\n1111,mango,1,2020-04-28T18:05:25.979Z\nTotal: 1 Juice`;
      assert.deepStrictEqual(actual, expected);
    });

    it('Should display the output for more than 1 juices', () => {
      const records = [
        {
          '--beverage': 'mango',
          '--qty': '2',
          '--id': '1111',
          '--date': '2020-04-28T18:05:25.979Z',
        },
      ];
      const actual = display(records);
      const expected = `Student ID, Beverage, Quantity, Date\n1111,mango,2,2020-04-28T18:05:25.979Z\nTotal: 2 Juices`;
      assert.deepStrictEqual(actual, expected);
    });
  });
});
