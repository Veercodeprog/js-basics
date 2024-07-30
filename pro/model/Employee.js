const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model('Employee', employeesSchema)