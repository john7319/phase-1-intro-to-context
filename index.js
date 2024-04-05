// Your code here
document.addEventListener("DOMContentLoaded", () => {});
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeDataArray) {
  const employeeRecords = [];
  for (const employeeData of employeeDataArray) {
    employeeRecords.push(createEmployeeRecord(employeeData));
  }
  return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateTimeString) {
  const newTimeInEvent = {
    type: "TimeIn",
    date: dateTimeString.slice(0, 10),
    hour: parseInt(dateTimeString.slice(-4)),
  };

  employeeRecord.timeInEvents.push(newTimeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  const newTimeOutEvent = {
    type: "TimeOut",
    date: dateTimeString.slice(0, 10),
    hour: parseInt(dateTimeString.slice(-4)),
  };

  employeeRecord.timeOutEvents.push(newTimeOutEvent);
  return employeeRecord;
}


function hoursWorkedOnDate(employee, date){
    const inEvent = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    const outEvent = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    const wage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payableAmt = dates.reduce(function(name, data){
        return name + wagesEarnedOnDate(employee, data)
    }, 0)

    return payableAmt
}

function findEmployeeByFirstName (newArray, firstName) {
    return newArray.find(function(name){
      return name.firstName === firstName
    })
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(pay, dates){
        return pay + allWagesFor(dates)
    }, 0)
}