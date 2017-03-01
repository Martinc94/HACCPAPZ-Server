var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var supplierSchema   = new Schema({
    email:  String,
    Supplier1: String,
    Supplier2: String,
    Supplier3: String,
    Supplier4: String,
    Supplier: String,
    Supplier6: String,
    Supplier7: String,
    Supplier8: String,
    Supplier9: String,  
    Supplier10: String

});

module.exports = mongoose.model('Supplier', supplierSchema);
