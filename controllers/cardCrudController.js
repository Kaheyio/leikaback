/***** CARD CRUD *****/

const Card = require('../models/Card');

// TODO: ask for a new card, block card

// GET ALL CARDS
module.exports.getCards_get = async (req, res) => {
    const cards = await Card.find();

    if (cards) {
        res.status(201).json(cards);
    } else {
        res.status(400).send('No card found')
    }
};

// GET CARD BY ID
module.exports.getCardById_get = async (req, res) => {
    const id = req.params.id;

    const card = await Card.findById({
        _id: id
    });

    if (card) {
        res.status(201).send(card);
    } else {
        res.status(400).send('This card doesn\'t exist');
    }
};

// GET A USER'S CARD(S) BY USER ID
module.exports.getUserCards_get = async (req, res) => {
    const cardHolder = req.params.cardHolder;

    const card = await Card.find({
        cardHolder
    });

    res.send(card);
};


// GET A USER'S CARD(S) BY ACCOUNT REF
module.exports.getAccountCards_get = async (req, res) => {
    const accountRef = req.params.accountRef;

    const card = await Card.find({
        accountRef
    });

    res.send(card);
};


// TEST : USERID FOR test4 = 62b43815c1687ee17ac1e9f0
// accountRef = 62cb4275e74bedd85397c329
// CREATE A CARD LINKED TO AN ACCOUNT
module.exports.createCard_post = async (req, res) => {
    const accountRef = req.params.accountRef;

    const {
        cardNumber,
        cardCVV,
        cardHolder,
        paymentNetwork,
        expirationDate,
    } = req.body;

    // check expirationDate and set cardStatus accordingly
    // 1) set expirationDate(from YYYY-mm in body to Date)
    const setExpirationDate = new Date(expirationDate);
    // 2) set current date
    const currentDate = new Date;
    // 3) NB use ternary assignment to assign conditional value to a const variable
    const cardStatus = (setExpirationDate <= currentDate ? 'Expired' : req.body.cardStatus);


    // TODO: validation

    // TODO: check if accountType !== credit, no card creation
    

    // TODO: set limit of 2 cards by credit account (if acount.canAddCard = false, no new card)


    // TODO: check if card doesn't already exist
    const cardExists = await Card.findOne({
        cardNumber
    });

    if (cardExists) {
        return res.status(400).send('This card is already registered');
    };


    const card = new Card({
        cardNumber,
        cardCVV,
        accountRef,
        cardHolder,
        paymentNetwork,
        expirationDate: setExpirationDate,
        cardStatus
    });

    await card.save();

    await res.status(201).send({
        created_card: card.id,
        associated_account: card.accountRef,
        card_status: card.cardStatus
    });
};


// DELETE A CARD
module.exports.deleteCard_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteCard = await Card.deleteOne({
            _id: id
        });
        res.status(201).json(deleteCard);
    } catch (err) {
        res.status(400).send('An error occurred, card was not deleted');
    }
};