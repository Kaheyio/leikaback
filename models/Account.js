const mongoose = require('mongoose');


const User = require('./User');
const Transaction = require('./Transaction');
const Card = require('./Card');

// One user can have several accounts (2 max)
// One account can have several operations
// One account can have one card (FOR NOW)

// TODO: CRYPT ALL SENSITIVE INFO

// TODO: set required fields to true

const accountSchema = new mongoose.Schema({
    // DO NOT SET DOCUMENT ID, IT'S AUTOMATIC 

    // TODO: balance = sum of all associated transactions
    // set to 10 by default and increment/decrement
    balance: {
        type: Number,
        default: 10
    },

    // info for bank id statement (RIB)
    bankIdStatement: {
        // établissement for ex 56898
        branchCode: String,
        // guichet for ex 01258
        counterCode: String,
        // n° de compte for ex 1245786T912
        accountNumber: String,
        // clé RIB for ex 46
        key: String,
        // domiciliation for ex LA BANQUE POSTALE BORDEAUX CENTRE FINANCIER
        domiciliation: String
    },

    // ONLY FOR CREDIT ACCOUNT !
    // for ex FR45 2006 7895 3256 8547 2T25 786
    accountIBAN: String,
    // for ex PSSTFRPPMAR for LA BANQUE POSTALE FR
    accountBIC: String,

    // accountType = credit or savings (if accountType = savings, no card)
    accountType: {
        type: String,
        enum: ['Credit', 'Savings']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    // account should not store all transactions (bad schema design for performance)
    // transactions: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'transaction'
    // }],

    // TODO: LATER, user can have 2 cards by account max (cards array)
    // cardRef: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'card'
    // },
    // TODO: LATER, if user already has two cards linked to a credit account, canAddCard = false
    // canAddCard: Boolean
}, {
    timestamps: true
}
);









// TODO: create method to get transactions amount and calculate sum to change account balance
const getBalance = async function () {
    // get transaction amount using its id

    // add transaction amount to accountSchema.balance
    const newBalance = accountSchema.balance + 25;
    console.log(newBalance);

    return balance;
};

module.exports = mongoose.model('account', accountSchema);