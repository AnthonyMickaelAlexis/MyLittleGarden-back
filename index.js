<<<<<<< HEAD

require('dotenv').config()


=======
>>>>>>> 06-09-micka
const express = require("express");
const cors = require('cors')

// We get express-session to manage user sessions
<<<<<<< HEAD
const session = require("express-session");
<<<<<<< HEAD
=======
// const session = require("express-session");
>>>>>>> 06-13-nordine
const initLocals = require('./app/middlewares/initLocals');

=======

require('dotenv').config()
>>>>>>> 06-09-micka

const router = require('./app/router/index');

const app = express();

<<<<<<< HEAD
app.use(initLocals);

<<<<<<< HEAD
=======
>>>>>>> 06-09-micka
=======
const session = require('express-session');
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
}));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})