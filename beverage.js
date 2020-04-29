const {loadPreviousData} = require('./src/saveRecords');
const {performTxn} = require('./src/performTxn');

const main = () => {
  const [, , action, ...data] = process.argv;
  const allRecords = loadPreviousData();
  const txnResponse = performTxn(action, data, allRecords);
  console.log(txnResponse);
};

main();
