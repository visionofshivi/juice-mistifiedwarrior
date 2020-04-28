const fs = require('fs');

const getData = (fileName) => {
  const studentTransactionData = fs.readFileSync(fileName, 'utf8');
  return JSON.parse(studentTransactionData);
};

const recordTransaction = (studentData, student, fileName) => {
  studentData.push(student);
  const data = JSON.stringify(studentData);
  fs.writeFileSync(fileName, data, 'utf8');
  return 'Transaction Recorded:';
};

const outputText = (data) => {
  const [StudentID, Beverage, Quantity, Date] = data;
  return `StudentID: ${StudentID}; Beverage: ${Beverage}; Quantity: ${Quantity}; Date: ${Date}`;
};

const findIndex = function (filterBy) {
  const headerData = ['--StudentID', '--Beverage', '--Quantity', '--Date'];
  return headerData.indexOf(filterBy);
};

const filter = (array, filterBy) => {
  const index = findIndex(filterBy[0]);
  const string = filterBy[1];
  const newArray = [];
  for (let i in array) {
    if (array[i][index] == string) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

const queryStudent = (studentData, data) => {
  const result = filter(studentData, data);
  if (result.length == 0) {
    return 'No Records Found';
  }
  let output = '';
  for (let i in result) {
    output = output + outputText(result[i]) + '\n';
  }
  return output;
};

const lookUp = (array, string) => {
  const index = array.indexOf(string);
  return array[index + 1];
};

const parseData = (data) => {
  const Beverage = lookUp(data, '--Beverage');
  const Quantity = lookUp(data, '--Quantity');
  const Date = lookUp(data, '--Date');
  return [Beverage, Quantity, Date];
};

const getStudentId = (studentData) => {
  if (studentData.length == 0) {
    return 1;
  }
  const lastStudent = studentData[studentData.length - 1];
  const id = lastStudent[0];
  return id + 1;
};

const newStudentData = (studentData, data, fileName) => {
  const studentTook = parseData(data);
  const studentId = getStudentId(studentData);
  studentTook.unshift(studentId);
  const status = recordTransaction(studentData, studentTook, fileName);
  return status + '\n' + outputText(studentTook);
};

const doAction = (cmdArgs, fileName, studentData) => {
  const [action, ...data] = cmdArgs;
  let output = 'Invalid Command';
  if (action == '--save') {
    output = newStudentData(studentData, data, fileName);
  }
  if (action == '--query') {
    output = queryStudent(studentData, data);
  }
  return output;
};

module.exports = {
  getData,
  recordTransaction,
  outputText,
  findIndex,
  filter,
  queryStudent,
  lookUp,
  parseData,
  getStudentId,
  newStudentData,
  doAction,
};
