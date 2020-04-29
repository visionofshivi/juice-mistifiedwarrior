const {
  converter,
  upDateRecords,
  writeRecords,
  showOutput,
} = require('./saveRecords');

const {filter, display} = require('./queryRecords');

const performSaveTxn = function (data, allRecords) {
  const studentTxn = converter(data);
  studentTxn['--date'] = new Date();
  upDateRecords(allRecords, studentTxn);
  const response = writeRecords(allRecords);
  return showOutput(response, studentTxn);
};

const performQuery = function (data, allRecords) {
  const filterBy = converter(data);
  const filtered = filter(allRecords, filterBy);
  return display(filtered);
};

const performTxn = function (action, data, allRecords) {
  const actions = {'--save': performSaveTxn, '--query': performQuery};
  const performAction = actions[action];
  return performAction(data, allRecords);
};

module.exports = {performTxn};
