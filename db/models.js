var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema  = new Schema({
    address: String,
    name: String,
    company: String,
    comment: String
});


module.exports = mongoose.model('Email', emailSchema);