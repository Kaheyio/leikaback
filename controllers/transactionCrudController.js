/***** TRANSACTION CRUD *****/

const Transaction = require('../models/Transaction');
const Card = require('../models/Card');
const Account = require('../models/Account');

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
    const transactions = await Transaction.find({}).populate("accountRef");

    if (transactions) {
        res.status(201).json(transactions);
    } else {
        res.status(400).send('No account found');
    }
};

// GET TRANSACTIONS BY ACCOUNT
module.exports.getAccountTransactions_get = async (req, res) => {
    const accountRef = req.params.accountRef;

    const transactions = await Transaction.find({}).populate("accountRef");

    if (transactions) {
        res.status(201).json(transactions);
    } else {
        res.status(400).send('No account found');
    }
};

// TEST WITH CREDIT ACCOUNT OF test4 = 62cb4275e74bedd85397c329
// CREATE GENERIC TRANSACTIONS EXCEPT WIRE TRANSFERS
module.exports.createTransaction_post = async (req, res) => {
    const accountRef = req.params.accountRef;

    /* TODO: title = body, amount = body, isAmountNegative = validation (check amount), submissionDate = body + validation (can't be future), accountRef = param, transactionType = body + validation (no wire transfer), transactionRef = body + validation (can be card number ref, so check cards), transactionStatus = body, estimatedDate = body + validation (can't be past + if estimated date has passed, set to null and change status to Past transaction), category = body, rejectionReason = body + validation */

    const {
        title,
        amount,
        submissionDate,
        transactionType,
        transactionRef,
        transactionStatus,
        estimatedDate,
        category,
        // FOR FAKE REJECTED TRANSACTIONS
        userValidationStatus,
        bankValidationStatus,
        rejectionReason
    } = req.body;

    // set isAmountNegative boolean
    // or if Math.sign(amount) == -1 (negative number)
    const isAmountNegative = (amount < 0 ? true : false);

    const currentDate = new Date;

    // TODO: validate submissionDate (can't be future) CHECK
    const setSubmissionDate = new Date(submissionDate);
    if (setSubmissionDate > currentDate) {
        return res.status(400).send('Submission date is incorrect (can\'t be in the future)');
    };

    // TODO: IF STATUS IS INCOMING : estimatedDate can't be in the past + if passed, set to null and change transactionStatus to 'Past'  CHECK
    const setEstimatedDate = "";
    if (estimatedDate) {
        setEstimatedDate = new Date(estimatedDate);
        if (setEstimatedDate <= currentDate) {
            estimatedDate = null;
            transactionStatus = "Past";
        };
        return setEstimatedDate;
    }

    // TODO: transactionType can't be wire transfer CHECK
    if (transactionType == "Wire Transfer") {
        return res.status(400).send('Wire transfers can\'t be initiated here');
    };


    // TODO: if transactionType = Card, check that cardNumber exists + card is valid CHECK
    if (transactionType == "Card") {
        const findCard = await Card.findOne({
            cardNumber: transactionRef
        });

        if (findCard) {
            if (findCard.cardStatus !== "Valid") {
                return res.status(400).send('Transaction can\'t be associated to an invalid card (card is either blocked or expired)');
            };
            transactionRef = findCard.cardNumber;
        };
    };

    // TODO: select category in front form


    // TODO: rejectionReason = if you create fake rejected transactions, also use uVS and bVS CHECK
    // if user cancels, userValidationReason = cancelled, reason = user cancellation
    if (rejectionReason == "User Declined") {
        userValidationStatus = "Cancelled";
    };
    // if bank refuses, uVS = Validated, bVS = false, reason = insufficient funds
    if (rejectionReason == "Insufficient Funds") {
        userValidationStatus = "Validated";
        bankValidationStatus = false;
    };

    const transaction = new Transaction({
        title,
        amount,
        isAmountNegative,
        submissionDate: setSubmissionDate,
        accountRef,
        transactionType,
        transactionRef,
        transactionStatus,
        userValidationStatus,
        bankValidationStatus,
        estimatedDate: setEstimatedDate,
        category,
        rejectionReason
    });

    await transaction.save();

    // TODO: update account balance CHECK
    const updateAccountBalance = await Account.findOneAndUpdate({
        _id: accountRef
    }, {
        $inc: {
            balance: amount
        }
    });
    await updateAccountBalance.save();


    await res.status(201).send({
        created_transaction: transaction.id,
        user_account: updateAccountBalance.id
    });
};


// TODO: CREATE WIRE TRANSFERS
// wire transfer becomes incoming
/* TODO: title = accountName or number, submissionDate = now, transactionType = wire transfer, targetAccount = param, transactionRef = body, category = select category in front, estimatedDate, bankValidationStatus */
// update beneficiary transferHistory

// TODO: CREATE PENDING TRANSACTION

// UPDATE STATUS OF TRANSACTION FOR PENDING TRANSACTION (LEIKODE VALIDATION)
/* TODO: userValidationStatus = body, bankValidationStatus = body + validation (account balance), rejectionReason */



// TODO: chain deletion
// DELETE TRANSACTION
module.exports.deleteTransaction_delete = async (req, res) => {
    const id = req.params.id;

    try {
        // find transaction and update account and beneficiaries before deletion
        const findTransaction = await Transaction.findOne({
            _id: id
        });

        //TODO: update account balance CHECK
        const updateAccountBalance = await Account.findOne({
            _id: findTransaction.accountRef
        });

        if (findTransaction.amount < 0) {
            await updateAccountBalance.update({
                $inc: {
                    balance: findTransaction.amount
                }
            });
        } else {
            await updateAccountBalance.update({
                $inc: {
                    balance: -findTransaction.amount
                }
            });
        }
        await updateAccountBalance.save();

        //TODO: update beneficiary (wire transfer)


        // delete transaction
        const deleteTransaction = await Transaction.deleteOne({
            _id: id
        });

        res.status(201).json(deleteTransaction);
    } catch (err) {
        res.status(400).send('An error occurred, transaction was not deleted');
    }
};