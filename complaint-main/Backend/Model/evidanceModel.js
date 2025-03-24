const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evidanceSchema = new Schema({
    complaintId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ComplaintModel', 
        required: true
    },
    photo: {
        type: String
    }
});

const Evidance = mongoose.model('Evidance', evidanceSchema);

module.exports = Evidance;
