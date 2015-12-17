/**
 * Created by KiranNiranjan on 15/12/15.
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var User = require('../model/user');
var Course = require('../model/course');

var messages = require('../core/messages');

router

    .post('/', function (req, res) {

        var user = new User();
        user.name = req.param('name');
        user.email = req.param('email');

        user.save(function (err) {
            if (err) {
                res.json({error: true, message: messages.UNABLE_TO_ADD_USER});
            } else {
                res.json({error: false, message: messages.USER_CREATED});
            }
        })

    })

    .get('/', function (req, res) {
        User.find(function (err, user) {
            if (err) {
                res.json({error: true, message: messages.USER_NOT_FOUND});
            } else {
                res.json(user)
            }
        })
    });

router.route('/:_id')

    .get(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json({error: true, message: messages.USER_NOT_FOUND});
            } else {
                res.json(user)
            }
        })
    })

    .put(function (req, res) {

        User.findById(req.params._id, function (err, user) {

            if (err) {
                res.json('user not found');
            } else {
                user.name = req.param('name');
                user.email = req.param('email');
            }

            user.save(function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(user)
                }
            })
        })
    });

router.route('/:_id/subscribe/:courseId')

    .post(function (req, res) {

        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.json({error: true, message: messages.NO_COURSE_FOUND});
            } else {
                var UserId = req.params._id;

                Course.findByIdAndUpdate(req.params.courseId, {$push: {subscribedStudents: UserId}}, function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        User.findByIdAndUpdate(req.params._id, {$push: {course: course}}, function (err, result) {
                            if (err) {
                                res.json(err);
                            } else {
                                res.json({error: false, message: messages.SUBSCRIBED});
                            }
                        })
                    }
                });
            }
        });
    });

router.route('/:_id/unSubscribe/:courseId')

    .delete(function (req, res) {

        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.json({error: true, message: messages.NO_COURSE_FOUND});
            } else {
                var UserId = req.params._id;
                Course.findByIdAndUpdate(req.params.courseId, {$pull: {subscribedStudents: UserId}}, function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        User.findByIdAndUpdate(req.params._id, {$pull: {course: course}}, function (err, result) {
                            if (err) {
                                res.json({error: true, message: err});
                            } else {
                                res.json({error: false, message: messages.UNSUBSCRIBED_COURSE, data: ''});
                            }
                        })
                    }
                });
            }
        });
    });


module.exports = router;
