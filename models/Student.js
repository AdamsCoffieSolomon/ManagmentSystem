const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studname: String,
    class: String,
    parents: Number,
    dateofadmin: Date,
    adress: String,
});
const student = mongoose.model('Student', studentSchema);
module.exports = student;