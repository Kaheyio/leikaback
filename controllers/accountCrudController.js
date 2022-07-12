/***** ACCOUNT CRUD *****/

const Account = require('../models/Account');


// GET ALL ACCOUNTS
module.exports.getAccounts_get = async (req, res) => {
    const accounts = await Account.find({}).populate("cardsRef");

    if (accounts) {
        res.status(201).json(accounts);
    } else {
        res.status(400).send('No account found')
    }
};

// GET ACCOUNT BY ACCOUNT ID
module.exports.getAccountById_get = async (req, res) => {
    const id = req.params.id;

    const account = await Account.findById({
        _id: id
    }).populate("cardsRef");

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
    }).populate("cardsRef");

    res.send(account);
};


// TEST : USERID FOR test4 = 62b43815c1687ee17ac1e9f0
// CREATE AN ACCOUNT
module.exports.createAccount_post = async (req, res) => {
    const userId = req.params.userId;

    /* TODO: accountName = body + validation (unique), balance = increment with transactions or body for savings or default (10), branchCode = body, counterCode = body, accountNumber = body + validation (unique), keyBIS = body, domiciliation = body, accountIBAN = body + validation, accountBIC = body, accountType = body, userId = param, cardsRef = with card creation, canAddCArd = with card creation */

    const {
        accountName,
        balance,
        branchCode,
        counterCode,
        accountNumber,
        keyBIS,
        domiciliation,
        accountIBAN,
        accountBIC,
        accountType
    } = req.body;


    
    // TODO: validation
    
    // check if acountName already exists


    // check if accountNumber already exists

    // check if accountIBAN already exists
   

    

    // balance is set to 10 by default, change amount in transactions crud or set amount in body

    const account = new Account({
        accountName,
        balance,
        branchCode,
        counterCode,
        accountNumber,
        keyBIS,
        domiciliation,
        accountIBAN,
        accountBIC,
        accountType
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