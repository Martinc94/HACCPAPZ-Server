var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var hotholdSchema   = new Schema({
    email:      String,
    date:       String,
    food:       String,
    time:       String,
    firstTemp:  String,
    secondTemp: String,
    thirdTemp:  String,
    comment:    String,
    sign:       String,
    checkon:    String,
    managersign:String

});

module.exports = mongoose.model('Hothold', hotholdSchema);
