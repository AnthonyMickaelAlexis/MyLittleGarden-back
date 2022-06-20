const express = require('express');

const checkTokenMiddleware = require('../middlewares/check')

const router = express.Router();

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const parcelController = require('../controllers/parcelController');

const cropController = require('../controllers/cropController');

router.get('/home', mainController.homePage);
router.get('/profil/users', checkTokenMiddleware, userController.getAllUsers);
// connexion page
router.get('/login', userController.loginUser);
router.post('/login', userController.loginUserConnection);

// register page
router.get('/register', userController.registeredUser);
router.post('/register', userController.registerUserPost);


// crop page
router.get('/crops',checkTokenMiddleware, cropController.getAllCrops);
router.get('/crop/:id',checkTokenMiddleware, cropController.getOneCrop);
router.post('/crop',checkTokenMiddleware, cropController.AddOneCrop);
router.delete('/crop/:id',checkTokenMiddleware, cropController.deleteCrop);

// favorite crp list

router.get('/:userid/favori', checkTokenMiddleware, cropController.GetFavoriteListForUser);
router.post('/:cropid/:userid',checkTokenMiddleware, cropController.AddCropInFavoriteList);


// member information profil, read, modify and delete
router.get('/home/profil/:user',checkTokenMiddleware, userController.getUserProfil);
router.patch('/home/profil/:userid',checkTokenMiddleware, userController.patchUserProfil);
router.delete('/profil/:user',checkTokenMiddleware, userController.deleteUser);

// parcel page (main page when the user is connected) read, modify parcel name and delete all crops from the parcel
router.get('home/profil/:user/parcel',checkTokenMiddleware, parcelController.getUserParcel);
router.patch('home/profil/:user/parcel',checkTokenMiddleware, parcelController.patchUserParcel);
router.delete('home/profil/:user/parcel/delete',checkTokenMiddleware, parcelController.deleteParcel);

module.exports = router;