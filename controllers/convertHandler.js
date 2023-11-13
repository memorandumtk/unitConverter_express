// const { init } = require("../server");

function ConvertHandler() {


  this.getNum = function (input) {
    const regNum = /^^((\d+(\.\d+)?)(\/(\d+(\.\d+)?))?)(([a-z]+)?)$|^(\w+)$/gi
    // using exec method so that I can use group function of exec
    const numArray = regNum.exec(input);
    if (!numArray) {
      num = false;
    } else if (numArray[9]) { //group 9 is only when character(\w) was input
      num = 1;
    } else if (numArray[4]) { //group 4 is denominator including /
      num = numArray[2] / numArray[5] // group 2 is numelator group 5 is just denominator
    } else if (numArray[1]) { // group 1 is for when number not including / is entered
      num = numArray[1]
    } else {
      num = false;
    }
    // inserting value to result
    let result;
    if (num) {
      result = parseFloat(num);
    } else {
      result = false;
    }
    return result;
  };

  this.getUnit = function (input) {
    const reg = /^^((\d+(\.\d+)?)(\/(\d+(\.\d+)?))?)(([a-z]+)?)$|^(\w+)$/gi
    const unitArray = reg.exec(input);
    if (!unitArray) {
      unit = input;
    } else if (unitArray[8]) { // group 8 is for string coming after number
      unit = unitArray[8];
    } else if (unitArray[9]) { // group 9 is for stirng only
      unit = unitArray[9];
    } else {
      unit = false;
    }
    // inserting value to result
    let result;
    const regOnlyUnit = /^((gal|km|mi|kg|lbs)|(l))$/gi;
    const regOnlyUnit2 = /((gal|km|mi|kg|lbs)|(l))$/gi;
    const regedInput = regOnlyUnit.exec(unit);
    const regedInput2 = regOnlyUnit2.exec(unit);
    if (!regedInput) {
      result = false;
      if (regedInput2) {
        //this is for my executional contidion and regex for pass of FCC test
        //in order to tell last letter is matched with one of unit 
        result = regedInput2[1];
      }
    } else if (regedInput[3]) {
      result = regedInput[3].toUpperCase();
    } else if (regedInput[2]) {
      result = regedInput[2].toLowerCase();
    }
    return result;
  }

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
    }
    return result;
  };

  this.getSpellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = ['galon', 'liter'];
        break;
      case 'L':
        result = ['liter', 'galon'];
        break;
      case 'mi':
        result = ['miles', 'kilometers'];
        break;
      case 'km':
        result = ['kilometers', 'miles'];
        break;
      case 'lbs':
        result = ['pounds', 'kilograms'];
        break;
      case 'kg':
        result = ['kilograms', 'pounds'];
    }
    return result;
  };

  this.getReturnNum = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (
    initNum,
    returnNum,
    spellOutUnit
  ) {
    let result;
    result = `${initNum} ${spellOutUnit[0]} converts to ${returnNum} ${spellOutUnit[1]}`;
    return result;
  };

  this.getJson = function (
    initNum,
    returnNum,
    initUnit,
    returnUnit,
    returnString
  ) {
    let result;
    result = { "initNum": initNum, "initUnit": initUnit, "returnNum": returnNum, "returnUnit": returnUnit, "string": returnString }
    return result;
  };

}

module.exports = ConvertHandler;
