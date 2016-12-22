var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var loginSchema   = new Schema({
    email:    String,
    time: String,
    date: String
});

module.exports = mongoose.model('LoginTime', loginSchema);
