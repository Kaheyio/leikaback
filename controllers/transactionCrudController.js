/***** TRANSACTION CRUD *****/

const Transaction = require('../models/Transaction');

// TODO: update balance of account = sum of all associated transactions (including transfer made or received)
// TODO: update transferHistory in beneficiary
//TODO: check if account balance is ok to confirm validation of pending transaction
// TODO: limit leikode validation to 3 trials, if still invalid, transaction is rejected

// TODO: wire transfer method
/* wire transfer is either made on a leika bank = change balance of sender account and recipient account
or made on an external account = change balance of sender account 
+ set new amount in beneficiary account
+ no wire transfer possible on someone else's savings account !!!
*/

// GET ALL TRANSACTIONS
module.exports.getTransactions_get = async (req, res) => {
    // TODO: populate jonction fields
    const transactions = await Transaction.find({}).populate("accountRef");

    if (transactions) {
        res.status(201).json(transactions);
    } else {
        res.status(400).send('No account found');
    }
};

// CREATE GENERIC TRANSACTIONS

// CREATE WIRE TRANSFERS

// UPDATE STATUS OF TRANSACTION OFR PENDING TRANSACTION (LEIKODE VALIDATION)


// DELETE TRANSACTION
module.exports.deleteTransaction_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteTransaction = await Transaction.deleteOne({
            _id: id
        });
        res.status(201).json(deleteTransaction);
    } catch (err) {
        res.status(400).send('An error occurred, transaction was not deleted');
    }
};