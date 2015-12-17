/**
 * Created by KiranNiranjan on 16/12/15.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var User = require('../model/user');
var Teacher = require('../model/teacher');
var Course = require('../model/course');
var messages = require('../core/messages.js');


router

    .post('/users', function (req, res) {

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

    .get('/users', function (req, res) {
        User.find(function (err, user) {
            if (err) {
                res.json('No users found')
            } else {
                res.json(user)
            }
        })
    });

router.route('/users/:_id')

    .get(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json('No users found')
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
    })

    .delete(function (req, res) {

        User.findById(req.params._id, function (err, user) {

            if (err) {
                res.json('No User delete');
            } else {
                user.remove(function (err) {
                    if (err) {
                        res.json('unable to remove the user');
                    } else {
                        res.json('removed the user successfully');
                    }
                })
            }
        })

    });

router.route('/users/:_id/subscribe/:courseId')

    .post(function (req, res) {

        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.json('No course');
            } else {
                var CourseObject = course.toObject();

                User.findByIdAndUpdate(req.params._id, {course: CourseObject}, function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json('Done');
                    }
                })
            }
        });
    });


router.route('/courses')

    .post(function (req, res) {

        var course = new Course();
        course.courseSubjects = req.param('courseSubjects');
        course.courseTitle = req.param('courseTitle');

        course.save(function (err) {
            if (err) {
                res.json('Error')
            } else {
                res.json('Done')
            }
        })

    })

    .get(function (req, res) {
        Course.find(function (err, course) {
            if (err) {
                res.json('No course found')
            } else {
                res.json(course)
            }
        })
    });

router.route('/teacher')

    .post(function (req, res) {

        var teacher = new Teacher();
        teacher.name = req.param('name');
        teacher.email = req.param('email');

        teacher.save(function (err) {
            if (err) {
                res.json('Error')
            } else {
                res.json('Done')
            }
        })

    })

    .get(function (req, res) {
        Teacher.find(function (err, teacher) {
            if (err) {
                res.json('No users found')
            } else {
                res.json(teacher)
            }
        })
    });

router.route('/teacher/:_id')

    .get(function (req, res) {
        Teacher.findById(req.params._id, function (err, teacher) {
            if (err) {
                res.json('No users found')
            } else {
                res.json(user)
            }
        })
    })

    .put(function (req, res) {

        Teacher.findById(req.params._id, function (err, teacher) {

            if (err) {
                res.json('user not found');
            } else {
                teacher.name = req.param('name');
                teacher.email = req.param('email');
            }

            teacher.save(function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(teacher)
                }
            })
        })
    });

router.route('/teacher/:_id/subscribe/:courseId')

    .post(function (req, res) {

        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.json('No course');
            } else {
                Teacher.findByIdAndUpdate(req.params._id, {$push: {course: course}}, function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json('Done');
                    }
                })
            }
        });
    });

router.route('/teacher/:_id/unSubscribe/:courseId')

    .delete(function (req, res) {

        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.json('No course');
            } else {
                Teacher.findByIdAndUpdate(req.params._id, {$pull: {course: course}}, function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json('Done');
                    }
                })
            }
        });
    });

module.exports = router;