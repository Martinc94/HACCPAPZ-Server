var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var deliverySchema   = new Schema({
    email:    String,
    q1: String,
    q2: String
});

module.exports = mongoose.model('Delivery', deliverySchema);
