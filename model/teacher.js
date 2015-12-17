/**
 * Created by KiranNiranjan on 16/12/15.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = require('../model/course');
var User = require('../model/user');

var teacherSchema = new Schema({

    name: {type: String, required: true},
    role: {type: String, required: true, default: 'Teacher'},
    email: {type: String, required: true, unique: true},
    course: {type: [Course.ObjectId]},

});

module.exports = mongoose.model('Teacher', teacherSchema);