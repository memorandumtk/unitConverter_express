const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Assertion for getNum function', function () {
        // #1
        test('Whole number', function () {
            assert.isNumber(convertHandler.getNum(1), 'This is entering 1');
        });
        // #2
        test('Decimal number', function () {
            assert.isNumber(convertHandler.getNum(1.1), 'This is entering 1.1');
        });
        // #3
        test('Fractional number', function () {
            assert.isNumber(convertHandler.getNum(3 / 2), 'This is entering 3/2');
        });
        // #4
        test('Fractional number with decimal', function () {
            assert.isNumber(convertHandler.getNum(3.5 / 2), 'This is entering 3.5/2');
        });
        // #5
        test('Wrong input with double-fraction number', function () {
            assert.isNumber(convertHandler.getNum(3 / 2 / 3), 'This is entering 3/2/3');
        });
        // #6
        test('Only inputting a charactor', function () {
            assert.isNumber(convertHandler.getNum('a'), 'This is entering "a"');
        });
    });

    suite('Assertion for getUnit function', function () {
        // #7
        test('Valid input', function () {
            assert.equal(convertHandler.getUnit('mi'), 'mi', 'This is entering mi');
        });
        // #8
        test('Invalid input', function () {
            assert.isFalse(convertHandler.getUnit('invalid'), 'This is entering invalid');
        });
        // #9
        test('Expect correct return ', function () {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'This is entering mi');
        });
        // #10
        test('Expect correct spelledout unit for valid input', function () {
            assert.isArray(convertHandler.getSpellOutUnit('mi'), 'This is entering mi for spelled out unit');
        });
        // #11
        test('Expect correct return L', function () {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'This is entering mi');
        });
        // #12
        test('Expect correct return gal', function () {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'This is entering mi');
        });
        // #13
        test('Expect correct return mi', function () {
            assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'This is entering mi');
        });
        // #14
        test('Expect correct return km', function () {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'This is entering mi');
        });
        // #15
        test('Expect correct return kg', function () {
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'This is entering mi');
        });
        // #16
        test('Expect correct return lbs', function () {
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'This is entering mi');
        });
    });
});