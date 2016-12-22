var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FitnessSchema   = new Schema({
    email:    String,
    q1EmpName: String,
    q2DateOfAssessment:   String,
    q3ReasonForAssessment: String,
    q4: String,
    qMed: String,
    q5: String,
    q6: String,
    q7: String,
    q8: String,
    q9: String,
    q10ActionTaken: String,
    q11OwnerManager: String,
    q12DateSigned: String
});

module.exports = mongoose.model('FitnessToWorkForm', FitnessSchema);
