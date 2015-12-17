var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = {
    courseId: {type: Schema.ObjectId},
    courseTitle: {type: String, required: true, default: 'Science'},
    courseSubjects: {type: String, required: false, default: 'Physic'},
    subscribedStudents: [{type: Schema.ObjectId}]
};

module.exports = mongoose.model('Course', courseSchema);