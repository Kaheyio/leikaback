const User = require('../models/User');
// to decrypt leikode
const bcrypt = require('bcryptjs');

// VALIDATE PENDING TRANSACTION
const Transaction = require('../models/Transaction');


// CHECK USER'S LEIKODE TO VALIDATE TRANSACTIONS
module.exports.leikode_post = async (req, res) => {
    const user = await User.findById({ _id: req.user._id});

    const leikode = req.body.leikode;
    // TODO: test validation in front
    if (!leikode) {
        return res.status(400).send('Please enter your Leikode');
    }

    const validLeikode = await bcrypt.compare(leikode, user.leikode);
    if (!validLeikode) {
        return res.status(400).send('Invalid Leikode');
    }
    await res.send({message: 'Your transaction has been validated'});
};


// validate pending transaction = 
// update status of transaction to incoming or rejected : userValidationStatus + check balance (bankValidationStatus)

// UPDATE STATUS OF TRANSACTION FOR PENDING TRANSACTION (LEIKODE VALIDATION)
module.exports.validatePendingTransaction_post = async (req, res) => {
    // userId as param
    // get transaction


    /* TODO: transactionStatus becomes incoming or rejected, estimatedDate if incoming, userValidationStatus = body, bankValidationStatus = body + validation (account balance), rejectionReason */

    // update transaction
    // if success = incoming

    // if fail = rejected

};