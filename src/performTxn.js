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
  const display = showOutput(response, studentTxn);
  console.log(display);
};

const performQuery = function (data, allRecords) {
  const filterBy = converter(data);
  const filtered = filter(allRecords, filterBy);
  const show = display(filtered);
  console.log(show);
};

const preformTxn = function (action, data, allRecords) {
  const actions = {'--save': performSaveTxn, '--query': performQuery};
  const performAction = actions[action];
  performAction(data, allRecords);
};

module.exports = {preformTxn};
