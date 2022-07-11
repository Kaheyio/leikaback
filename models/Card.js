const mongoose = require('mongoose');


const User = require('./User');
const Account = require('./Account');

// One user can have several accounts (2 max)
// One account can have several operations
// One account can have one card (FOR NOW)
// One card is linked to one account and to one user

// TODO: CRYPT ALL SENSITIVE INFO


const cardSchema = new mongoose.Schema({
    // DO NOT SET DOCUMENT ID, IT'S AUTOMATIC 
    
    // for ex 4275 3156 0372 5493
     cardNumber: String,

    // CVV = secret number at the back of the card
    // for ex 568
    cardCVV: String,

    accountRef: {
        type: mongoose.Types.ObjectId,
        ref: 'account'
    },
    cardHolder: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    // paymentNetwork = Visa or Mastercard or American Express
    paymentNetwork: {
        type: String,
        enum: ['Visa', 'Mastercard', 'American Express'] 
    },

    // limits (plafonds) for card payment. NOT NEEDED IN OUR CASE ?
    // limits: Number,

    // TODO: add expiration date and set cardStatus to Expired 
    // for ex 2024-03 (= Fri Mar 01 2024 01:00:00 GMT+0100 (heure normale d’Europe centrale))
    expirationDate: Date,
    
    // cardStatus = validation pending (user requested a 2nd card), blocked, valid
    cardStatus: {
        type: String,
        enum: ['Validation pending', 'Valid', 'Blocked', 'Expired']
    }
},{
    timestamps: true
}
);
 
module.exports = mongoose.model('card', cardSchema); 