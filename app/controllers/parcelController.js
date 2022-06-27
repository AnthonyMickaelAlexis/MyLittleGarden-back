/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const parcelDatamapper = require('../models/parcel');
const userDataMapper = require('../models/user');
const userHasCropDataMapper = require('../models/user_has_plant');

const parcelController = {

  async getAllParcels(_, res) {
    const parcels = await parcelDatamapper.findAllParcels();
    return res.json(parcels);
  },

  // get request on page parcel
  async getUserParcel(req, res, next) {
    try {
      const userId = Number(req.params.user, 10);
      if (Number.isNaN(userId)) {
        return next();
      }

      const userHasCrop = await parcelDatamapper.findAllCropsInParcel(userId);

      res.json(userHasCrop);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // patch request on page parcel
  async patchUserParcel(req, res) {
    try {
      const userHasCrops = [{
        user_id: 1,
        crop_id: 1,
        parcel_id: 1,
        position_x: 5,
        position_y: 0,
      },
      {
        user_id: 1,
        crop_id: 3,
        parcel_id: 1,
        position_x: 1,
        position_y: 0,
      },
      {
        user_id: 1,
        crop_id: 4,
        parcel_id: 1,
        position_x: 3,
        position_y: 0,
      },
      {
        user_id: 1,
        crop_id: 2,
        parcel_id: 1,
        position_x: 7,
        position_y: 0,
      },
      {
        user_id: 1,
        crop_id: 4,
        parcel_id: 1,
        position_x: 0,
        position_y: 1,
      },
      ];
      // console.log(JSON.stringify(obj1) === JSON.stringify(obj2))
      for (const crop of userHasCrops) {
        // eslint-disable-next-line no-await-in-loop
        const userHasCropsReadingDB = await userHasCropDataMapper.findByInfo(crop);
        if (JSON.stringify(userHasCropsReadingDB) === JSON.stringify(crop)) {
          console.log('Déjà présent en bdd');
        } else {
          // eslint-disable-next-line no-await-in-loop
          await userHasCropDataMapper.insertSavedParcel(crop);
        }
      }
      res.send('Parcel bien sauvegardé');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // delete request to delete all crops on parcel
  async deleteParcel(req, res) {
    try {
      const userId = Number(req.params.user, 10);
      await userHasCropDataMapper.findByPk(userId);
      await userHasCropDataMapper.delete(userId);
      res.send('All crops from parcel have been removed');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async AddCropInParcel(req, res, next) {
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

      const parcel = await parcelDatamapper.findParcelByUserId(userid);
      if (!parcel) {
        return res.status(401).json({ message: "Cette parcelle n'existe pas !" });
      }

      const dataCrop = {
        user_id: user.id,
        crop_id: cropId,
        parcel_id: parcel.id,
        position_x: req.body.position_x,
        position_y: req.body.position_y,
      };

      const filledBox = await userHasCropDataMapper.findPositionInParcel(dataCrop);

      if (filledBox) {
        return res.status(401).json({ message: 'Cette position est prise !' });
      }

      // insertIntoParcel
      await userHasCropDataMapper.insertCropInParcel(dataCrop);

      res.send(`Crop ${cropId} ajouté dans la parcelle de ${user.user_name}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async DeleteCropInParcel(req, res, next) {
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

      const parcel = await parcelDatamapper.findParcelByUserId(userid);
      if (!parcel) {
        return res.status(401).json({ message: "Cette parcel n'existe pas !" });
      }

      const dataCrop = {
        user_id: user.id,
        crop_id: cropId,
        parcel_id: parcel.id,
        position_x: req.body.position_x,
        position_y: req.body.position_y,
      };

      const cropInParceExist = await userHasCropDataMapper.findOneCropInParcel(dataCrop);

      if (!cropInParceExist) {
        return res.status(401).json({ message: `Crop${dataCrop.crop_id} inexistant dans cet position  !` });
      }

      await userHasCropDataMapper.deleteCropIntoParcel(dataCrop);

      res.send(`crop ${cropId} en position_x${dataCrop.position_x}, position_y ${dataCrop.position_y} supprimé de la parcelle à ${user.user_name}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  async ModifyName(req, res) {
    try {
      await parcelDatamapper.modifyName(req.body.id, req.body.name);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

};
module.exports = parcelController;
