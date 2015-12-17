/**
 * Created by KiranNiranjan on 15/12/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = require('../model/course');

var userSchema = new Schema({

    name: {type: String, required: true},
    role: {type: String, required: true, default: 'User'},
    email: {type: String, required: true, unique: true},
    course: {type: [Course.ObjectId]}

});

module.exports = mongoose.model('User', userSchema);
