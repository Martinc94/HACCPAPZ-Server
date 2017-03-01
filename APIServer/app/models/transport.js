var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var transportSchema   = new Schema({
    email:    	String,
    date: 		String,
    food: 		String,
    batch: 		String,
    customer: 	String,
    separation: String,
    temp: 		String,
    comment: 	String,
    sign: 		String,
    checkon: 	String,
    managersign:String,
    lat: 	    String,
    long:       String


});

module.exports = mongoose.model('Transport', transportSchema);
