/***** ACCOUNT CRUD *****/

const Account = require('../models/Account');
const User = require('../models/User');

const Transaction = require('../models/Transaction');

const mongoose = require('mongoose');

const toId = mongoose.Types.ObjectId;

// TODO: balance of account = sum of all associated transactions

// GET ALL ACCOUNTS
module.exports.getAccounts_get = async (req, res) => {
    const accounts = await Account.find();
    res.send(accounts);
};

// GET ACCOUNT BY ID
module.exports.getAccountById_get = async (req, res) => {
    const id = req.params.id;

    const account = await Account.findById({
        _id: id
    });

    if (account) {
        res.status(201).send(account);
    } else {
        res.status(400).send('This account doesn\'t exist');
    }

};


// GET A USER'S ACCOUNT(S) BY USER ID
module.exports.getUserAccounts_get = async (req, res) => {
    const userId = req.params.userId;

    const account = await Account.find({
        userId
    });

    res.send(account);
};


// TEST : USERID FOT test4 = 62b43815c1687ee17ac1e9f0
// CREATE AN ACCOUNT
module.exports.createAccount_post = async (req, res) => {
    const userId = toId(req.params.userId);

    // const bankIdStatement = {
    // branchCode,
    // counterCode,
    // accountNumber,
    // key,
    // domiciliation
    // }

    // TODO: add bankIdStatement
    const {
        balance,
        bankIdStatement,
        accountIBAN,
        accountBIC,
        accountType,
        cardRef
    } = req.body;



    // TODO: validate required fields
    // TODO: add cardRef and BIS
    // if (!accountType) {
    //     res.send('Account was not created, one or several fields missing');
    //     return;
    // }

    // balance is set to 10 by default, change amount in transactions crud

    const account = new Account({
        balance,
        bankIdStatement,
        accountIBAN,
        accountBIC,
        accountType,
        userId,
        cardRef
    });

    await account.save();

    await res.status(201).send({
        created_account: account.id,
        user_account: account.userId
    });
};


// DELETE ACCOUNT
module.exports.deleteAccount_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteAccount = await Account.deleteOne({
            _id: id
        });
        res.status(201).json(deleteAccount);
    } catch (err) {
        res.status(400).send('An error occurred, account was not deleted');
    }
};