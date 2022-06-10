
require('dotenv').config()


const express = require("express");

// We get express-session to manage user sessions
<<<<<<< HEAD
const session = require("express-session");
const initLocals = require('./app/middlewares/initLocals');
=======
// const session = require("express-session");
// const initLocals = require('./app/middlewares/initLocals');
>>>>>>> 06-10-nordine


const router = require('./app/router/index');

const app = express();

<<<<<<< HEAD
app.use(initLocals);
=======
// app.use(initLocals);
>>>>>>> 06-10-nordine

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})