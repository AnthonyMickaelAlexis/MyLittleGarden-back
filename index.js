const express = require("express");

// We get express-session to manage user sessions
const session = require("express-session");

require('dotenv').config()

const router = require('./app/router/index');

const app = express();

app.use(initLocals);

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})