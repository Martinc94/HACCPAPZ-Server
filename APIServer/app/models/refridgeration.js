var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var refridgerationSchema   = new Schema({
    email:  String,
    name: String,
    temp: String,
    date:   String,
    timeAMPM: String
});

module.exports = mongoose.model('Refridgeration', refridgerationSchema);
