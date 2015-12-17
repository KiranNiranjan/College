/**
 * Created by KiranNiranjan on 15/12/15.
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Course = require('../model/course');
var messages = require('../core/messages.js');

router

    .get('/', function (req, res) {
        Course.find(function (err, course) {
            if (err) {
                res.json({error: true, message: messages.NO_COURSE_FOUND});
            } else {
                res.json({error: true, data: course});
            }
        })
    })

    .post('/', function (req, res) {

        var course = new Course();
        course.courseTitle = req.param('courseTitle');
        course.courseSubjects = req.param('courseSubjects');

        course.save(function (err) {
            if (err) {
                res.json({error: true, message: messages.UNABLE_TO_ADD_COURSE});
            } else {
                res.json({error: false, message: messages.COURSE_CREATED});
            }
        })

    });

module.exports = router;