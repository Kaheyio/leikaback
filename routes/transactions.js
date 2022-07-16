const router = require('express').Router();

const transactionCrudController = require('../controllers/transactionCrudController');

const leikodeController = require('../controllers/leikodeController');

// to protect a route, use authMiddleware
const { requireAuth } = require('../middlewares/authMiddleware');



// route = /api/transactions/

// GET ALL 
router.get('/', transactionCrudController.getTransactions_get);

// GET WITH FILTERS //
// get by account ref
router.get('/account/:accountRef', transactionCrudController.getAccountTransactions_get);

// get by account ref, status and submission date (desc)
router.get('/account/:accountRef/status/:transactionStatus', transactionCrudController.getAccountTransactionsFiltered_get);

// get by estimated date for incoming transactions ?


// CREATE
// create generic transactions (admin)
router.post('/account/:accountRef', transactionCrudController.createGenericTransaction_post);

// create wire transfers (user actions)


// validate pending transactions with leikode and update status
// router.post('/protected/validation', requireAuth, leikodeController.leikode_post);


// DELETE
router.delete('/delete/:id', transactionCrudController.deleteTransaction_delete);


module.exports = router;