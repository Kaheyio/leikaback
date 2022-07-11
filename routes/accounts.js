const router = require('express').Router();

const accountCrudController = require('../controllers/accountCrudController');

// NB: full route is localhost:PORT/api/accounts/...


// GET ALL ACCOUNTS
router.get('/', accountCrudController.getAccounts_get);


// GET WITH FILTERS //
// get one account by its id
router.get('/:id', accountCrudController.getAccountById_get);

// get all accounts of one user
router.get('/user/:userId', accountCrudController.getUserAccounts_get);

// CREATE USER ACCOUNT
router.post('/user/:userId', accountCrudController.createAccount_post);

// DELETE USER ACCOUNT WITH ACCOUNT ID
router.delete('/user/:id', accountCrudController.deleteAccount_delete);


module.exports = router;