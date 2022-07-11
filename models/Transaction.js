const mongoose = require('mongoose');


const Account = require('./Account');

// One user can have several accounts (2 max)
// One account can have several operations
// One operation can be linked to several accounts ?


// TODO: CRYPT ALL SENSITIVE INFO
 
// TODO: use enum

const transactionSchema = new mongoose.Schema({
    // DO NOT SET DOCUMENT ID, IT'S AUTOMATIC 
    
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    amountBool: Boolean,
    emissionDate: {
        // Date = 2022-07-01 00:00:00
        type: Date,
        required: true,
    },

    // associated account
    accountRef: {
        type: mongoose.Types.ObjectId,
        ref: 'account',
        required: true
    },

    // recipient account in case of transfer ?
    // targetAccount: String

    // transactionType = card or direct debit or wire transfer
    transactionType: {
        type: String,
        enum: ['Card', 'Direct debit', 'Wire transfer'],
        required: true
    },

    // card number reference or direct debit reference or wire transfer note
    transactionRef: {
        type: String,
        required: true
    },

    // transactionStatus = incoming or pending (to be validated) or past or rejected
    transactionStatus: {
        type: String,
        enum: ['Incoming', 'Pending', 'Past', 'Rejected'],
        required: true
    },

    // INCOMING TRANSACTION
    estimatedDate: Date,

    // PENDING TRANSACTION
    // userValidationStatus (user validates pending transactions with leikode) = pending, cancelled, validated 
    userValidationStatus: {
       type: String,
       enum: ['Pending', 'Cancelled', 'Validated'] 
    },

    // bankValidationStatus (after user validation, bank validates if balance is ok)
    bankValidationStatus: Boolean,

    // PAST TRANSACTION
    // ???
    // TODO: use enum
    category: String,
    subcategory: String,

    // REJECTED TRANSACTION
    // rejectionReason = invalid leikode (?), user cancellation or insufficient funds/balance
    rejectionReason: {
        type: String,
        enum: ['Invalid Leikode', 'User cancellation', 'Insufficient funds'] 
     }
});

module.exports = mongoose.model('transaction', transactionSchema);