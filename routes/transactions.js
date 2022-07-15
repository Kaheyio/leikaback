const router = require('express').Router();

const transactionCrudController = require('../controllers/transactionCrudController');

// route = /api/transactions/

// GET ALL 
router.get('/', transactionCrudController.getTransactions_get);

// GET WITH FILTERS //
// get by account ref
router.get('/account/:accountRef', transactionCrudController.getAccountTransactions_get);

// get by date (today, yesterday, before)

// get by status

// CREATE
// create generic transactions (admin)
router.post('/account/:accountRef', transactionCrudController.createTransaction_post);

// create wire transfers (user actions)

// UPDATE
// update status of transaction for pending transactions : userValidationStatus + check balance (bankValidationStatus)


// DELETE
router.delete('/delete/:id', transactionCrudController.deleteTransaction_delete);


module.exports = router;