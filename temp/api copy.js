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
      const regNum = /^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?/g
      const regOnlyUnit = /^(gal|km|mi|kg|lbs|l)$/gi;
      if (regOnlyUnit.test(queryInput)) {
        num = ['1']
        unit = queryInput;
      } else if (/^\D*$/g.test(queryInput)) {
        // consider for only being input number
        num = [''];
        unit = queryInput;
      } else if (queryInput.includes('//')) {
        num = [null];
        
      } else {
        num = regNum.exec(queryInput);
        // The case if num[0] includes '/'
        if (num[0].indexOf('/') !== -1) {
          let slash = num[0].indexOf('/');
          num[0] = parseFloat(num[0].substring(0, slash)) / parseFloat(num[0].substring(slash + 1));
        }
        unit = queryInput.substring(regNum.lastIndex);
      }

      // Modifing Proccess
      let initNum, initUnit, returnNum, returnUnit, returnString, returnJson;
      let spelledOutUnit = [];
      initNum = convertHandler.getNum(num);
      initUnit = convertHandler.getUnit(unit);
      if (initUnit !== false && initNum !== false) {
        returnUnit = convertHandler.getReturnUnit(initUnit);
        returnNum = convertHandler.getReturnNum(
          parseFloat(initNum),
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
      } else if (initUnit === false && initNum === false) {
        returnString = 'invalid number and unit'
        returnJson = "invalid number and unit"
      } else if (initNum === false) {
        returnString = 'invalid number'
        returnJson = "invalid number"
      } else if (initUnit === false) {
        returnString = 'invalid unit'
        returnJson = "invalid unit"
      }
      //Send JSON
      console.log('this is returnString >> ' + returnString)
      res.json(returnJson)
    })
};
