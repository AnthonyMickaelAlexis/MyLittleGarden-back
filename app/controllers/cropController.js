/* eslint-disable consistent-return */
const cropDataMapper = require('../models/crop');
const favoritecropDataMapper = require('../models/favorite_crop');
const userDataMapper = require('../models/user');

const cropController = {

  async getAllCrops(_, res) {
    try {
      // DataMapper to (SELECT * FROM crop;)
      const crops = await cropDataMapper.findAll();
      return res.json(crops);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async getOneCrop(req, res, next) {
    try {
      const cropId = parseInt(req.params.id, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }
      const crop = await cropDataMapper.findByPk(cropId);
      if (!crop) {
        return next();
      }
      res.json(crop);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async AddOneCrop(req, res) {
    try {
      const dataCrop = {
        name: req.body.name,
        crop_img: req.body.crop_img,
        description: req.body.description,
      };
      await cropDataMapper.insert(dataCrop);
      res.json(dataCrop);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async deleteCrop(req, res, next) {
    try {
      const cropId = parseInt(req.params.id, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }
      await cropDataMapper.delete(cropId);
      res.send(` Le crop ${cropId} a bien été supprimé`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async AddCropInFavoriteList(req, res, next) {
    try {
      const cropId = parseInt(req.params.cropid, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }
      const userid = parseInt(req.params.userid, 10);
      if (Number.isNaN(userid)) {
        return next();
      }
      const user = await userDataMapper.findByPK(userid);
      if (!user) {
        return res.status(401).json({ message: "Cet utilisateur n'existe pas !" });
      }
      const checkCropExist = await favoritecropDataMapper.checkIfFavoriteCropExist(cropId, userid);
      if (checkCropExist) {
        console.log('Le légume est déjà en favori');
      } else {
        await favoritecropDataMapper.insertIntoFavoriteList(cropId, userid);
      }
      res.send('Crop ajouté aux favoris');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async GetFavoriteListForUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userid, 10);
      if (Number.isNaN(userId)) {
        return next();
      }

      const user = await userDataMapper.findByPK(userId);
      if (!user) {
        return res.status(401).json({ message: "Cet utilisateur n'existe pas !" });
      }
      const favoriteList = await favoritecropDataMapper.findAllCropsFavorite(userId);
      res.json(favoriteList);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async DeleteCropInFavoriteList(req, res, next) {
    try {
      const cropId = parseInt(req.params.cropid, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }

      const userid = parseInt(req.params.userid, 10);
      if (Number.isNaN(userid)) {
        return next();
      }
      const user = await userDataMapper.findByPK(userid);
      if (!user) {
        return res.status(401).json({ message: "Cet utilisateur n'existe pas !" });
      }
      await favoritecropDataMapper.deleteIntoFavoriteList(cropId, userid);
      res.send('Crop supprimé des favoris');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

};

module.exports = cropController;
