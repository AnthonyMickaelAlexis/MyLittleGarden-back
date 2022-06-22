const express = require('express');

const checkTokenMiddleware = require('../middlewares/check')

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


// crop page
router.get('/crops', cropController.getAllCrops);
router.get('/crop/:id',checkTokenMiddleware, cropController.getOneCrop);
router.post('/crop',checkTokenMiddleware, cropController.AddOneCrop);
router.delete('/crop/:id',checkTokenMiddleware, cropController.deleteCrop);

// favorite crp list

router.get('/:userid/favori',cropController.GetFavoriteListForUser);
router.post('/:cropid/:userid',cropController.AddCropInFavoriteList);
router.delete('/:userid/:cropid',cropController.DeleteCropInFavoriteList)

// member information profil, read, modify and delete
router.get('/home/profil/:user',checkTokenMiddleware, userController.getUserProfil);
router.patch('/home/profil/:userid',checkTokenMiddleware, userController.patchUserProfil);
router.delete('/profil/:user', userController.deleteUser);

// parcel page (main page when the user is connected) read, modify parcel name and delete all crops from the parcel
router.get('/parcels',parcelController.getAllParcels)
router.get('/profil/:user/parcel', parcelController.getUserParcel);
router.post('/:cropid/:userid/parcel', parcelController.AddCropInParcel);
router.delete('/:userid/:cropid/parcel', parcelController.DeleteCropInParcel);
router.patch('/profil/:user/parcel',parcelController.patchUserParcel);
router.delete('/profil/:user/parcel/delete',parcelController.deleteParcel);

module.exports = router;