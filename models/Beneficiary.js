const mongoose = require('mongoose');

// One user can have several beneficiaries (wire transfer recipients)
// One beneficiary can be linked to several users, no ref to users

const beneficiarySchema = new mongoose.Schema({

    // for ex FR4520067895325685472T25786
    accountIBAN: String,

    // these two can be the same
    beneficiaryName: String,
    accountTitle: String,

    // populate with info from transfer transaction
    transferHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'transaction'
    }]

},{
    timestamps: true
});

module.exports = mongoose.model('beneficiary', beneficiarySchema);