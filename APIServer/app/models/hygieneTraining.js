var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var hygieneTrainingSchema   = new Schema({
    email:    String,
    name: String,
    position: String,
    dateOfEmployment: String,
    NatureOfTraining: String,
    date: String,
    trainer: String,
    EmployeeSignature: String,
    furtherTrainingNature: String,
    furtherProvider: String,
    furtherDateCompeted: String,
    furtherEmpSig: String,
    furtherEmployeeSig: String
});

module.exports = mongoose.model('hygieneTraining', hygieneTrainingSchema);
