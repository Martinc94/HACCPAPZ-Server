var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({
    email:  String,
    Food1:  String,
    Food2:  String,
    Food3:  String,
    Food4:  String,
    Food5:  String,
    Food6:  String,
    Food7:  String,
    Food8:  String,
    Food9:  String,
    Food10:  String
});

module.exports = mongoose.model('Food', FoodSchema);
