require('dotenv').config()


const express = require("express");

// We get express-session to manage user sessions
const session = require("express-session");
const initLocals = require('./app/middlewares/initLocals');


const router = require('./app/router/index');

const app = express();

// parcel page (main page when the user is connected) read, modify parcel name and delete all crops from the parcel
router.get('/home/profil/:user/parcel', parcelController.getUserParcel);
router.patch('/home/profil/:user/parcel', parcelController.patchUserParcel);
router.delete('/home/profil/:user/parcel/delete', parcelController.deleteParcel);

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})