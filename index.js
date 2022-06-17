
require('dotenv').config()


const express = require("express");
const cors = require('cors')

// We get express-session to manage user sessions
// const session = require("express-session");
const initLocals = require('./app/middlewares/initLocals');


const router = require('./app/router/index');

const app = express();

app.use(initLocals);

const session = require('express-session');
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "gqdsfp^jiokg^dipqsjotgjpherzquioeztryqjnpkobvnkm,lqfdspjihogqzds"
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})
