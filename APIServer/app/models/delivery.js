var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var deliverySchema   = new Schema({
    email:    String,
    date: String,
    food: String,
    batchCode: String,
    supplier: String,
    useBy: String,
    temp: String,
    vehicleCheck: String,
    comment: String,
    sign: String,
	photoId: String
	
	
});

module.exports = mongoose.model('Delivery', deliverySchema);