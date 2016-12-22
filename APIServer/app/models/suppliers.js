var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var supplierSchema   = new Schema({
    email:  String,
    sName1: String,
    sName2: String,
    sName3: String,
    sName4: String,
    sName5: String,
    sName6: String,
    sName7: String,
    sName8: String,
    sName9: String,  
    sName10: String

});

module.exports = mongoose.model('Supplier', supplierSchema);
