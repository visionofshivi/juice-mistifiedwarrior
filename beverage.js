const fs = require('fs');

const converter = (data) => {
  let result = {};
  data.forEach((element, index) => {
    if (element.startsWith('--')) {
      result[element] = data[index + 1];
    }
  });
  return result;
};

const loadPreviousData = () => {
  const data = fs.readFileSync('beveragesList.json', 'utf8');
  return JSON.parse(data);
};

const upDateRecords = (studentTransaction) => {
  const result = loadPreviousData();
  result.push(studentTransaction);
  return result;
};

const writeRecords = (data) => {
  const writeableData = JSON.stringify(data);
  fs.writeFileSync('beveragesList.json', writeableData, 'utf8');
  return 'Transaction Recorded:';
};

const showOutput = (response, lastTxn) => {
  return `${response}
  Student ID,Beverage,Quantity,Date
  ${lastTxn['--id']},${lastTxn['--beverage']},${lastTxn['--qty']},${lastTxn['--date']}`;
};

const main = () => {
  const [, , action, ...data] = process.argv;
  const studentTransaction = converter(data);
  studentTransaction['--date'] = new Date();
  const previousTransactions = upDateRecords(studentTransaction);
  const response = writeRecords(previousTransactions);
  const display = showOutput(response, studentTransaction);
  console.log(display);
};
main();
