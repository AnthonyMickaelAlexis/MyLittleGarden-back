const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const parcelController = require('../controllers/parcelController');

// const cropsController = require('../controllers/cropsController');

router.get('/home', mainController.homePage);
router.get('/', mainController.getAllUsers);
// connexion page
router.get('/login', userController.loginUser);
router.post('/login', userController.loginUserConnection);

// register page
router.get('/register', userController.registerUser);
router.post('/register', userController.registerUserPost);

// member information profil, read, modify and delete
router.get('home/profil/:user', userController.getUserProfil);
router.patch('home/profil/:user', userController.patchUserProfil);
router.delete('', userController.deleteUser);

// parcel page (main page when the user is connected) read, modify parcel name and delete all crops from the parcel
router.get('home/profil/:user/parcel', parcelController.getUserParcel);
router.patch('home/profil/:user/parcel', parcelController.patchUserParcel);
router.delete('home/profil/:user/parcel/delete', parcelController.deleteParcel);

module.exports = router;