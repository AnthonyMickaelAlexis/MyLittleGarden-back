/* eslint-disable consistent-return */
const cropDataMapper = require('../models/crop');
const favoritecropDataMapper = require('../models/favorite_crop');
const userDataMapper = require('../models/user');

const { ApiError } = require('../helpers/errorHandler');

const cropController = {

  async getAllCrops(_, res) {
    const crops = await cropDataMapper.findAll();
    return res.json(crops);
  },

  async getOneCrop(req, res, next) {
    try {
      const cropId = parseInt(req.params.id, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }

      const crop = await cropDataMapper.findByPk(cropId);
      if (!crop) {
        throw new ApiError('Crop not found', { statusCode: 404 });
      }
      return res.json(crop);
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
      const crop = await cropDataMapper.findByPk(cropId);
      if (!crop) {
        throw new ApiError('This crop does not exists', { statusCode: 404 });
      }

      await cropDataMapper.delete(cropId);

      return res.status(204).json();
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

      const crop = await cropDataMapper.findByPk(cropId);
      if (!crop) {
        throw new ApiError('This crop does not exists', { statusCode: 404 });
      }

      const userid = parseInt(req.params.userid, 10);

      if (Number.isNaN(userid)) {
        return next();
      }
      const user = await userDataMapper.findByPK(userid);
      if (!user) {
        throw new ApiError('This user does not exists', { statusCode: 404 });
      }
      const checkCropExist = await favoritecropDataMapper.checkIfFavoriteCropExist(cropId, userid);
      if (checkCropExist) {
        console.log('Le légume est déjà en favori');
      } else {
        await favoritecropDataMapper.insertIntoFavoriteList(cropId, userid);
      }
      res.send('crop ajouté au favoris');
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
        throw new ApiError('This user does not exists', { statusCode: 404 });
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
        throw new ApiError('This user does not exists', { statusCode: 404 });
      }

      await favoritecropDataMapper.deleteIntoFavoriteList(cropId, userid);

      return res.status(204).json();
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

};

module.exports = cropController;
