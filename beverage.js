const {loadPreviousData} = require('./src/saveRecords');
const {preformTxn} = require('./src/performTxn');

const main = () => {
  const [, , action, ...data] = process.argv;
  const allRecords = loadPreviousData();
  preformTxn(action, data, allRecords);
};

main();
