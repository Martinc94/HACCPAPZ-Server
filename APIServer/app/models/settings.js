var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var settingsSchema   = new Schema({
    email:    String,
    noOfRef:  String,
    setting2: String,
    setting3: String
});

module.exports = mongoose.model('Setting', settingsSchema);
