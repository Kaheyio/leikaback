const router = require('express').Router();

const transactionCrudController = require('../controllers/transactionCrudController');

// route = /api/transactions/

// GET ALL 
router.get('/', transactionCrudController.getTransactions_get);

// GET WITH FILTERS //
// get by date (today, yesterday, before)

// CREATE
// create generic transactions (admin)
router.post('');

// create wire transfers (user actions)

// UPDATE
// update status of transaction for pending transactions : userValidationStatus + check balance (bankValidationStatus)


// DELETE
router.delete('/:id', transactionCrudController.deleteTransaction_delete);


module.exports = router;