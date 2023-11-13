// const { init } = require("../server");

function ConvertHandler() {


  this.getNum = function (input) {
    const regNum = /^^((\d+(\.\d+)?)(\/(\d+(\.\d+)?))?)(([a-z]+)?)$|^(\w+)$/gi
    const numArray = regNum.exec(queryInput);
    if (!numArray) {
      num = false;
    } else if (numArray[4]) {
      num = numArray[2] / numArray[5]
    } else if (numArray[1]) {
      num = numArray[1]
    } else {
      num = false;
    }

    let result;
    if (input) {
      result = parseFloat(input);
    } else {
      result = false;
    }
    return result;
  };

  this.getUnit = function (input) {
    const regNum = /^^((\d+(\.\d+)?)(\/(\d+(\.\d+)?))?)(([a-z]+)?)$|^(\w+)$/gi
    const numArray = regNum.exec(queryInput);
    if (!numArray) {
      unit = queryInput;
    } else if (numArray[8]) {
      unit = numArray[8];
    } else if (numArray[9]) {
      unit = numArray[9];
      num = 1;
    } else {
      unit = false;
    }
    let result;
    const regOnlyUnit = /^((gal|km|mi|kg|lbs)|(l))$/gi;
    const regOnlyUnit2 = /((gal|km|mi|kg|lbs)|(l))$/gi;
    const regedInput = regOnlyUnit.exec(input);
    const regedInput2 = regOnlyUnit2.exec(input);
    if (!regedInput) {
      result = false;
      if (regedInput2) {
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
