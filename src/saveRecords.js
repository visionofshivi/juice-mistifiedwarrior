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

const upDateRecords = (allRecords, studentTransaction) => {
  return allRecords.push(studentTransaction);
};

const writeRecords = (data) => {
  const writeableData = JSON.stringify(data);
  fs.writeFileSync('beveragesList.json', writeableData, 'utf8');
  return 'Transaction Recorded:';
};

const showOutput = (response, lastTxn) => {
  return `${response}\nStudent ID,Beverage,Quantity,Date\n${lastTxn['--id']},${lastTxn['--beverage']},${lastTxn['--qty']},${lastTxn['--date']}`;
};

module.exports = {
  converter,
  loadPreviousData,
  upDateRecords,
  writeRecords,
  showOutput,
};
