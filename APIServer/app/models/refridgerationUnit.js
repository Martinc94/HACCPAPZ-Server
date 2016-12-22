var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var refridgerationUnitSchema   = new Schema({
    email:  String,
    name1: String,
    name2: String,
    name3: String,
    name4: String,
    name5: String,
    name6: String
});

module.exports = mongoose.model('RefridgerationUnit', refridgerationUnitSchema);