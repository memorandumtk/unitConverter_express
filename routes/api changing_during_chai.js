'use strict';
const expect = require('chai').expect;
const { default: next } = require('next');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res, next) {
      let num, unit;
      const queryInput = req.query.input;
      console.log('this is query input >> ' + queryInput)
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
      console.log('it is num ', num, ' and unit ', unit)

      // Modifing Proccess
      let initNum, initUnit, returnNum, returnUnit, returnString, returnJson;
      let spelledOutUnit = [];
      initNum = convertHandler.getNum(num);
      initUnit = convertHandler.getUnit(unit);
      if (initUnit && initNum) {
        returnUnit = convertHandler.getReturnUnit(initUnit);
        returnNum = convertHandler.getReturnNum(
          initNum,
          initUnit
        );
        spelledOutUnit = convertHandler.getSpellOutUnit(initUnit);
        returnString = convertHandler.getString(
          initNum,
          returnNum,
          spelledOutUnit
        );
        returnJson = convertHandler.getJson(
          initNum,
          returnNum,
          initUnit,
          returnUnit,
          returnString
        );
      } else if (!initUnit && !initNum) {
        returnString = 'invalid number and unit'
        returnJson = "invalid number and unit"
      } else if (!initUnit) {
        returnString = 'invalid unit'
        returnJson = "invalid unit"
      } else if (!initNum) {
        returnString = 'invalid number'
        returnJson = "invalid number"
      }
      //Send JSON
      console.log('this is returnString >> ' + returnString)
      res.json(returnJson)
    })
};
