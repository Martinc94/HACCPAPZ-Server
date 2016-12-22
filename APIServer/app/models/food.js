var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({
    email:  String,
    food1:  String,
    food2:  String,
    food3:  String,
    food4:  String,
    food5:  String,
    food6:  String,
    food7:  String,
    food8:  String,
    food9:  String,
    food10:  String
});

module.exports = mongoose.model('Food', FoodSchema);
