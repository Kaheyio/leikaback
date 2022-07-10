const mongoose = require('mongoose');


const User = require('./User');
const Account = require('./Account');

// One user can have several accounts (2 max)
// One account can have several operations
// One account can have one card (FOR NOW)
// One card is linked to one account and to one user

// TODO: use enum

const cardSchema = new mongoose.Schema({
    // DO NOT SET DOCUMENT ID, IT'S AUTOMATIC 
    
    cardNumber: String,
    // secret number at the back of the card
    // cardSecret: String,
    accountRef: {
        type: mongoose.Types.ObjectId,
        ref: 'account'
    },
    cardHolder: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    // TODO: use enum
    // paymentNetwork = Visa or Mastercard or American Express
    paymentNetwork: String,

    // limits (plafonds) for card payment. NOT NEEDED IN OUR CASE ?
    // limits: Number,

    // TODO: use enum
    // cardStatus = validation pending (user requested a 2nd card), blocked, valid
    cardStatus: String
},{
    timestamps: true
}
);

module.exports = mongoose.model('card', cardSchema);