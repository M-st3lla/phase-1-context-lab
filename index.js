/* Your Code Here */
function createEmployeeRecord(employeeDataArray) {
    if (employeeDataArray && employeeDataArray.length > 0) {
      // Assuming the employeeDataArray structure is [firstName, lastName, otherFields...]
      let employeeRecord = {
        firstName: employeeDataArray[0] ? employeeDataArray[0] : 'Unknown', // Handle null/undefined value
        lastName: employeeDataArray[1] ? employeeDataArray[1] : 'Unknown',
        familyName: employeeDataArray[1] ? employeeDataArray[1] : 'Unknown',
        title: employeeDataArray[2] ? employeeDataArray[2] : 'Unknown',
        payPerHour: employeeDataArray[3] !== undefined ? employeeDataArray[3] : 1,
        timeInEvents: [], 
        timeOutEvents: [],
      };
      return employeeRecord;
    } else {
      return null; 
    }
  }
  function createEmployeeRecords(arrayOfArrays) {
    let employeeRecords = [];
    arrayOfArrays.forEach(employeeDataArray => {
      let employeeRecord = createEmployeeRecord(employeeDataArray);
      employeeRecords.push(employeeRecord);
    });
    return employeeRecords;
  }
  function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      let timeIn = new Date(`${date} ${timeInEvent.hour}`);
      let timeOut = new Date(`${date} ${timeOutEvent.hour}`);
      let hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60); // Calculate hours worked
      return hoursWorked;
    } else {
      return 0; // Return 0 hours worked if no matching timeIn and timeOut events are found
    }
  }
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let ratePerHour = employeeRecord.hourlyRate; // Assuming the employee's rate per hour is stored in hourlyRate property
  
    let wagesEarned = hoursWorked * ratePerHour;
    return wagesEarned;
  }
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  function calculatePayroll(csvData) {
    // Perform payroll calculations based on the imported CSV data
    // Your implementation here
    // Example: return the calculated payroll
    return "Payroll calculated successfully";
  }
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

