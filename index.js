let testEmployees = [
  ["gary", "worm", "security", 3],
  ["tom", "holland", "professor", 4],
  ["harry", "styles", "musician", 4],
  ["bob", "sagget", "actor", 4],
];

function createEmployeeRecord(employee) {
  let record = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return record;
}

// console.log(createEmployeeRecord(testEmployees));

function createEmployeeRecords(employee) {
  return employee.map(createEmployeeRecord);
}

// console.log(createEmployeeRecords(testEmployees));

function createTimeInEvent(object, dateTime) {
  let [date, hour] = dateTime.split(" ");
  hour = parseInt(hour);
  let type = "TimeIn";
  object.timeInEvents.push({ type, hour, date });
  return object;
}
// console.log(
//   createTimeInEvent(createEmployeeRecords(testEmployees)[1], "08/12/2021 800")
// );

function createTimeOutEvent(object, dateTime) {
  let [date, hour] = dateTime.split(" ");
  hour = parseInt(hour);
  let type = "TimeOut";
  object.timeOutEvents.push({ type, hour, date });
  return object;
}
console.log(
  createTimeOutEvent(createEmployeeRecords(testEmployees)[1], "08/12/2021 1800")
);

function hoursWorkedOnDate(object, workDate) {
  let clockedIn = object.timeInEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

  let clockedOut = object.timeOutEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

  return (clockedOut - clockedIn) / 100;
}

function wagesEarnedOnDate(object, date) {
  return object.payPerHour * hoursWorkedOnDate(object, date);
}

function allWagesFor(object) {
  let result = [];
  const allDates = object.timeInEvents.map(
    (element) => (element = element.date)
  );
  for (let element of allDates) {
    result.push(wagesEarnedOnDate(object, element));
  }
  return result.reduce((a, b) => a + b, 0);
}

function findEmployeeByFirstName(array, firstN) {
  return array.find((object) => object.firstName === firstN);
}

function calculatePayroll(array) {
  return array
    .map((object) => allWagesFor(object))
    .reduce((a, b) => (a = a + b), 0);
}
