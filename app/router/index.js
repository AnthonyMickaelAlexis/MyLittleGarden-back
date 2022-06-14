const express = require('express');

const router = express.Router();

<<<<<<< HEAD
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const parcelController = require('../controllers/parcelController');

// const cropsController = require('../controllers/cropsController');

router.get('/home', mainController.homePage);
router.get('/', userController.getAllUsers);
// connexion page
router.get('/login', userController.loginUser);
router.post('/login', userController.loginUserConnection);

// register page
router.get('/register', userController.registeredUser);
router.post('/register', userController.registerUserPost);

// member information profil, read, modify and delete
router.get('/home/profil/:user', userController.getUserProfil);
router.patch('/home/profil/:user/patch', userController.patchUserProfil);
router.delete('/home/profil/:user/delete', userController.deleteUser);

// parcel page (main page when the user is connected) read, modify parcel name and delete all crops from the parcel
router.get('/home/profil/:user/parcel', parcelController.getUserParcel);
router.patch('/home/profil/:user/parcel', parcelController.patchUserParcel);
router.delete('/home/profil/:user/parcel/delete', parcelController.deleteParcel);

module.exports = router;
=======
/*
const parcelController = require('./controllers/parcelController');
const userController = require('./controllers/userController');
const cropsController = require(./controllers/cropsController');
*/

/* GET /home/profil/:user/parcel page de récupération parcel du membre 
router.get(‘home/profil/:user/parcel’, parcelController.getUserParcel);

GET /home/profil/:user page de consultation des infos du membre
router.get(‘home/profil/:user’, userController.getUserProfil);

GET /home/profil/:user/crops page de mise en favori des plants
router.get’/home/profil/:user/crops’, cropsController.getFavoriteCrops

POST /login page de connexion
router.post(‘login’, userController.loginUser);

POST /register page d’inscription d’un visiteur au site
router.post(‘register’, userController.registerUser);

PATCH /home/profil/:user/modify page de modification des infos du membre
router.patch(‘home/profil/:user/modify’, userController.patchUserModify);

PATCH /home/profil/:user/parcel/save page de sauvegarde des plants et du nom de la parcelle 
router.patch(‘/home/profil/:user/parcel/save’, parcelController.patchUserParcel);

DELETE /home/profil/:user/delete page de suppression du membre
router.delete(‘home/profil/:user/delete’, userController.deleteUser);

DELETE /home/profil/:user/parcel/delete page de suppression de plants de la parcelle du membre
router.delete(‘home/profil/:user/parcel/delete’, parcelController.deleteParcel); */
>>>>>>> 06-09-micka
