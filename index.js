const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// Import Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');

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
// TODO: try cors if other method doesn't work on production
// app.use(cors());

// OR
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
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

app.listen(process.env.PORT || process.env.API_PORT, () => console.log(`Server works: http://localhost:${process.env.API_PORT}/api`));