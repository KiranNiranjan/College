/**
 * Created by KiranNiranjan on 16/12/15.
 */

var supertest = require('supertest');
var should = require('should');

var server = supertest.agent('localhost:3000' + '/users');

describe('User: Route', function () {

    describe('create()', function () {

        it('should add a user', function (done) {

            var newRecord = {
                "name": 'KiKe',
                "email": 'KiKan@kike.co.in'
            };

            server
                .post('/')
                .send(newRecord)
                .expect(200)
                .end(function (err, res) {

                    should.not.exist(err);
                    res.body.error.should.equal(false);

                    done();

                });
        });

        it('should not add a user', function (done) {

            var newRecord = {
                "email": 'kiran@kike.co.in'
            };

            server
                .post('/')
                .send(newRecord)
                .expect(200)
                .end(function (err, res) {

                    should.not.exist(err);
                    res.body.error.should.equal(true);

                    done();

                });
        });

        it('should get user information', function (done) {

            server
                .get('/')
                .expect(200)
                .end(function (err, res) {

                    should.not.exist(err);
                    res.body.error.should.equal(false);

                    done();

                });
        });
    });
});