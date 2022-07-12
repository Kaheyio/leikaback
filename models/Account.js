const mongoose = require('mongoose');


const User = require('./User');
const Transaction = require('./Transaction');
const Card = require('./Card');

// One user can have several accounts
// One account can have several operations
// One credit account can have two cards max


// TODO: set required fields to true

const accountSchema = new mongoose.Schema({
    // DO NOT SET DOCUMENT ID, IT'S AUTOMATIC 
    // for ex Main, Secondary, Savings, Shared
    accountName: String,

    // TODO: balance = sum of all associated transactions
    // set to 10 by default and increment/decrement
    balance: {
        type: Number,
        default: 10
    },

    // info for bank id statement (RIB) //
        // établissement for ex 56898
        branchCode: String,
        // guichet for ex 01258
        counterCode: String,
        // n° de compte for ex 1245786T912
        accountNumber: String,
        // clé RIB for ex 46
        keyBIS: String,
        // domiciliation for ex LEIKA BANK BORDEAUX FINANCIAL CENTRE
        domiciliation: String,
    ////////////////////////////////////

    // ONLY FOR CREDIT ACCOUNT !
    // for ex FR45 2006 7895 3256 8547 2T25 786
    accountIBAN: String,
    // for ex PSSTFRPPBOR for LEIKA BANK FR
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

    // user can have 2 cards max by credit account (cards array)
    cardsRef: [{
        type: mongoose.Types.ObjectId,
        ref: 'card'
    }],
    
    // if user already has two cards linked to a credit account, canAddCard = false
    canAddCard: Boolean
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