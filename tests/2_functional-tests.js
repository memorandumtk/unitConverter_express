const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const agent = chai.request.agent(server).keepOpen();


suite('Functional Tests', function () {
    this.timeout(5000);
    suite('Integration tests with chai-http', function () {
        // #1
        test('Test GET /api/convert?input=10L', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=10L')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text,
                        '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liter converts to 2.64172 galon"}'
                        );
                    done();
                });
        });
        // #2
        test('Test GET /api/convert?input=32g for getting invalid unit message', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=32g')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text,
                        'invalid unit'
                        );
                    done();
                });
        });
        // #3
        test('Test GET /api/convert?input=3/7.2/4kg for checking invalid number message', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=3/7.2/4kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text,
                        'invalid number'
                        );
                    done();
                });
        });
        // #4
        test('Test GET /api/convert?input=3/7.2/4kilomegagram for checking invalid number and unit message', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text,
                        'invalid number and unit'
                        );
                    done();
                });
        });
        // #5
        test('Test GET /api/convert?input=kg for checking valid input with no number', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert?input=kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text,
                        '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}'
                        );
                    done();
                });
        });
    });
});