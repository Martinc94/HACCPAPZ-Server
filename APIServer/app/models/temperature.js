var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var temperatureSchema   = new Schema({
    email		: String,
    date		: String,
    food        : String,
    startTime   : String,
    finishTime  : String,
    cookTemp    : String,
    cookSign    : String,
    fridgeTime  : String,
    coolSign    : String,
    reheatTemp  : String,
    reheatSign  : String,
    comment     : String,
    checkon     : String,
    managersign : String

});

module.exports = mongoose.model('Temperature', temperatureSchema);
