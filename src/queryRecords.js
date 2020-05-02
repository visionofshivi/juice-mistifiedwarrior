const filter = (allRecords, filterBy) => {
  const keys = Object.keys(filterBy);
  keys.forEach((key) => {
    if (key != '--date') {
      allRecords = allRecords.filter((record) => record[key] == filterBy[key]);
    }
  });
  if (keys.includes('--date')) {
    allRecords = allRecords.filter(
      (record) => record['--date'].split('T')[0] == filterBy['--date']
    );
  }
  return allRecords;
  // const filterRecords = (record) => record['--id'] == filterBy['--id'];
  // return allRecords.filter(filterRecords);
};

const countJuices = (juiceRecords) => {
  const sum = (totalJuices, record) => totalJuices + +record['--qty'];
  const result = juiceRecords.reduce(sum, 0);
  if (result == 1) {
    return '1 Juice';
  }
  return result + 'Juices';
};

const display = (records) => {
  let result = '';
  const totalJuices = countJuices(records);
  records.forEach((record) => {
    result += `${record['--id']},${record['--beverage']},${record['--qty']},${record['--date']}\n`;
  });
  return `Student ID, Beverage, Quantity, Date\n${result}Total: ${totalJuices}`;
};

module.exports = {filter, display};
