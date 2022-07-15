/***** ACCOUNT CRUD *****/

const Account = require('../models/Account');
const User = require('../models/User');

// GET ALL ACCOUNTS
module.exports.getAccounts_get = async (req, res) => {
    const accounts = await Account.find({}).populate("cardsRef");

    if (accounts) {
        res.status(201).json(accounts);
    } else {
        res.status(400).send('No account found');
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


    // check if accountName already exists
    const checkAccountName = await Account.find({ accountName });

    if (checkAccountName) {
        return res.status(400).send('An account is already registered to this name');
    }

    // check if accountNumber already exists
    const checkAccountNumber = await Account.find({ accountNumber });

    if (checkAccountNumber) {
        return res.status(400).send('An account is already registered to this account number');
    }

    // check if accountIBAN already exists
    const checkAccountIBAN = await Account.find({ accountIBAN });

    if (checkAccountIBAN) {
        return res.status(400).send('An account is already registered to this IBAN');
    }

    // !!! balance is set to 10 by default on account creation, change amount in transactions crud or set amount in body !!!
    // cardsRef and canAddCard are updated on on card creation

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
        accountType,
        userId
    });

    await account.save();


    // update accounts in user 
    const updateUserAccounts = await User.findByIdAndUpdate({
        _id: userId
    }, {
        $addToSet: {
            accounts: account._id
        }
    });
    await updateUserAccounts.save();

    await res.status(201).send({
        created_account: account.id,
        user_account: account.userId
    });
};


// TODO: chain deletion
// DELETE ACCOUNT
module.exports.deleteAccount_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteAccount = await Account.deleteOne({
            _id: id
        });

        // TODO: update user
        // TODO: delete cards
        // TODO: delete transactions
        // TODO: update transactions ?

        res.status(201).json(deleteAccount);
    } catch (err) {
        res.status(400).send('An error occurred, account was not deleted');
    }
};
