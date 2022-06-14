<<<<<<< HEAD

require('dotenv').config()


=======
>>>>>>> 06-09-micka
const express = require("express");

// We get express-session to manage user sessions
const session = require("express-session");
<<<<<<< HEAD
const initLocals = require('./app/middlewares/initLocals');

=======

require('dotenv').config()
>>>>>>> 06-09-micka

const router = require('./app/router/index');

const app = express();

<<<<<<< HEAD
app.use(initLocals);

=======
>>>>>>> 06-09-micka
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})