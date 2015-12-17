/**
 * Created by KiranNiranjan on 16/12/15.
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Teacher = require('../model/teacher');
var Course = require('../model/course');
var messages = require('../core/messages');

router

    .post('/', function (req, res) {

        var teacher = new Teacher();
        teacher.name = req.param('name');
        teacher.email = req.param('email');

        teacher.save(function (err) {
            if (err) {
                res.json({error: true, message: messages.TEACHER_NOT_FOUND});
            } else {
                res.json({error: false, message: messages.TEACHER_CREATED});
            }
        })

    })

    .get('/', function (req, res) {
        Teacher.find(function (err, teacher) {
            if (err) {
                res.json({error: true, message: messages.TEACHER_NOT_FOUND});
            } else {
                res.json({error: false, data: teacher});
            }
        })
    });

router.route('/:_id')

    .get(function (req, res) {
        Teacher.findById(req.params._id, function (err, teacher) {
            if (err) {
                res.json('No users found')
            } else {
                res.json(teacher)
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

router.route('/:_id/subscribe/:courseId')

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

router.route('/courses')

    .post(function (req, res) {

        var course = new Course();
        course.courseTitle = req.param('courseTitle');
        course.courseSubjects = req.param('courseSubjects');

        course.save(function (err) {
            if (err) {
                res.json(err)
            } else {
                res.json('Done')
            }
        })
    });


router.route('/:_id/myStudent/:courseId')

    .get(function (req, res) {
        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.json({error: true, message: messages.NO_COURSE_FOUND});
            } else {
                res.json({error: false, data: (course.subscribedStudents)});
            }
        })
    });

module.exports = router;