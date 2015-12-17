/**
 * Created by KiranNiranjan on 16/12/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({

    name: {type: String, required: true},
    role: {type: String, required: true, default: 'Admin'},
    email: {type: String, required: true, unique: true},
    course: {type: []}
});

module.exports = mongoose.model('Admin', adminSchema);

