const filter = (allRecords, filterBy) => {
  const result = [];
  allRecords.forEach((record) => {
    if (record['--id'] == filterBy['--id']) {
      result.push(record);
    }
  });
  return result;
};

const countJuices = (juiceRecords) => {
  let totalJuices = 0;
  juiceRecords.forEach((record) => {
    totalJuices += +record['--qty'];
  });
  return totalJuices;
};

const display = (records) => {
  let result = '';
  const totalJuices = countJuices(records);
  records.forEach((record) => {
    result += `${record['--id']},${record['--beverage']},${record['--qty']},${record['--date']}\n`;
  });
  return `Student ID, Beverage, Quantity, Date\n${result}Total: ${totalJuices} Juices`;
};

module.exports = {filter, display};
