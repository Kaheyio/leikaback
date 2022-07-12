const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// Import Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const accountsRoute = require('./routes/accounts');
const transactionsRoute = require('./routes/transactions');
const cardsRoute = require('./routes/cards');

// cookie parser
const cookieParser = require('cookie-parser');

// to hide important credentials
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
    console.log('Connected to database')
);

// Middlewares

/* [NB Cross-origin resource sharing (CORS) = browser mechanism that allows a web page to use assets and data from other pages or domains.
Extends and adds flexibility to the same-origin policy (SOP). However, also provides potential for cross-domain attacks, if a website's CORS policy is poorly configured and implemented.]
The cors package available in the npm registry is used to tackle CORS errors in a Node.js application. */
// if other method doesn't work on production
// app.use(cors());

// OR
app.use(function (req, res, next) {
    // create whitelist of domains
    const whitelist = ['https://leika.netlify.app', 'http://localhost:4200'];
    const origin = req.headers.origin;
    if (whitelist.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.setHeader('Access-Control-Allow-Origin', 'https://leika.netlify.app');
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Post request Middleware (we use express's body parser so we can send post requests)
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// to use cookie parser
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/accounts', accountsRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/cards', cardsRoute);

app.listen(process.env.PORT || process.env.API_PORT, () => console.log(`Server works: http://localhost:${process.env.API_PORT}`));

// set the public folder as static (to display assets such as images)
app.use(express.static(__dirname + '/public'));

// display welcome to leikaback
app.get('/', async (req, res) => {
    res.send(
        '<!DOCTYPE html><html><head><title>Leika Bank API</title><link rel="icon" type="image/x-icon" href="/images/favicon.ico" style="width: 50px; height: 50px;"></head><body style="display: flex;align-items: center;"><div style="font-family: sans-serif; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center"><h1 style="color: #3d3d3d;">Welcome to the Leika Bank API</h1><img src="/images/leika_woman.png" alt="leika logo" style="height: 300px; filter: hue-rotate(60deg) invert(90%) grayscale();"></div></body></html>'
    )
});

/* TEST for favicon = icon card + check symbol = https://cdn2.iconfinder.com/data/icons/free-simple-line-mix/48/16-Credit_Card-1024.png
mobile + euro symbol = https://cdn1.iconfinder.com/data/icons/business-finance-communication-and-healthcare/64/message-communication-phone-payment-euro-mobile-1024.png
*/
/* TEST for image = leika woman = https://to-do-cdn.microsoft.com/static-assets/f2f56b7d4c72910540effed9ccddae703d8d09b94075dddfeeab6cd79def0c60/icons/welcome-right.png
leika man = https://to-do-cdn.microsoft.com/static-assets/c26cd0d92ec61ba2c661adefaa535ab3cc4fb124f347a850fded8034dad5d360/icons/welcome-left.png
*/