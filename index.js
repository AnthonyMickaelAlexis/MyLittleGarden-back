require('dotenv').config()

const express = require("express");
const cors = require('cors')

// We get express-session to manage user sessions
// const session = require("express-session");
// const checkTokenMiddleware = require('./app/middlewares/check');

const router = require('./app/router/index');

const { homePage } = require('./app/controllers/mainController');

const app = express();


// app.use(checkTokenMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.use((req, res, next) => {
    console.log(req.session);
    next();
  });

app.use(router);

app.use((req, res) => {
    res.status(404);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})
