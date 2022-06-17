const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const parcelController = require('../controllers/parcelController');

const cropController = require('../controllers/cropController');

router.get('/home', mainController.homePage);
router.get('/profil/users', userController.getAllUsers);

// connexion page
router.get('/login', userController.loginUser);
router.post('/login', userController.loginUserConnection);

// register page
router.get('/register', userController.registeredUser);
router.post('/register', userController.registerUserPost);

router.get('/crops', cropController.getAllCrops);
router.get('/crop/:id', cropController.getOneCrop);
router.post('/crop', cropController.AddOneCrop);
router.delete('/crop/:id', cropController.deleteCrop);

// member information profil, read, modify and delete
router.get('/home/profil/:user', userController.getUserProfil);
router.patch('/home/profil/:user', userController.patchUserProfil);
router.delete('/profil/:user', userController.deleteUser);

// parcel page (main page when the user is connected) read, modify parcel name and delete all crops from the parcel
router.get('home/profil/:user/parcel', parcelController.getUserParcel);
router.patch('home/profil/:user/parcel', parcelController.patchUserParcel);
router.delete('home/profil/:user/parcel/delete', parcelController.deleteParcel);

module.exports = router;