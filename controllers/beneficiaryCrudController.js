/***** BENFICIARY CRUD *****/

const Beneficiary = require('../models/Beneficiary');
const Account = require('../models/Account');

// TODO: create method to add a beneficiary

// TODO: wire transfer method
/* wire transfer is either made on a leika bank = change balance of sender account and recipient account
or made on an external account = change balance of sender account 
+ set new amount in beneficiary account
+ no wire transfer possible on someone else's savings account !!!
*/

// GET ALL BENEFICIARIES
module.exports.getBeneficiaries_get = async (req, res) => {
    const beneficiaries = await Beneficiary.find({}).populate("transferHistory");

    if (beneficiaries) {
        res.status(201).json(beneficiaries);
    } else {
        res.status(400).send('No beneficiary found');
    }
};

// GET BENEFICIARY BY BENEFICIARY ID
module.exports.getBeneficiaryById_get = async (req, res) => {
    const id = req.params.id;

    const beneficiary = await Beneficiary.findById({
        _id: id
    }).populate("transferHistory");

    if (beneficiary) {
        res.status(201).send(beneficiary);
    } else {
        res.status(400).send('This beneficiary doesn\'t exist');
    }
};


// CREATE A BENEFICIARY (AND ADD IT TO USER )
module.exports.createBeneficiary_post = async (req, res) => {

    /* TODO: accountIBAN = body + validation (is unique in user's profile + not valid if incorrect format ?) + if corresponds to a leika account get info of said account instead of creating a beneficiary account, beneficiaryName = body, accountTitle, transferHistory = update in transaction crud */

    

};

// TODO: chain deletion
// DELETE BENEFICIARY
module.exports.deleteBeneficiary_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteBeneficiary = await Beneficiary.deleteOne({
            _id: id
        });
        res.status(201).json(deleteBeneficiary);
    } catch (err) {
        res.status(400).send('An error occurred, beneficiary was not deleted');
    }
};