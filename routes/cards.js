const router = require('express').Router();

const cardCrudController = require('../controllers/cardCrudController');

// GET ALL Cards
router.get('/', cardCrudController.getCards_get);


// GET WITH FILTERS //
// get one card by its id
router.get('/:id', cardCrudController.getCardById_get);

// get all cards by user
router.get('/user/:cardHolder', cardCrudController.getUserCards_get);

// get all cards by account
router.get('/account/:accountRef', cardCrudController.getAccountCards_get);

// CREATE ACCOUNT CARD
router.post('/account/:accountRef', cardCrudController.createCard_post);

// DELETE ACCOUNT CARD WITH CARD ID
router.delete('/account/:id', cardCrudController.deleteCard_delete);


module.exports = router;