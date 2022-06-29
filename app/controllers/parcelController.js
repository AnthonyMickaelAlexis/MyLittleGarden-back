/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const parcelDatamapper = require('../models/parcel');
const userDataMapper = require('../models/user');
const cropDataMapper = require('../models/crop');
const userHasCropDataMapper = require('../models/user_has_plant');
const favoriteCropDataMapper = require('../models/favorite_crop');

const parcelController = {
  // méthode pas utilisé pour le moment mais dans une version amélioré du site
  // pour pour un admin qui veut administrer les parcelles des utilisateurs
  async getAllParcels(_, res) {
    const parcels = await parcelDatamapper.findAllParcels();
    return res.json(parcels);
  },

  // méthode pour récupérer la parcelle de l'utilisateur
  async getUserParcel(req, res, next) {
    try {
      const userId = Number(req.params.user, 10);

      if (Number.isNaN(userId)) {
        return next();
      }

      const user = await userDataMapper.findByPK(userId);
      if (!user) {
        return res.status(401).json({ message: 'This user does not exists' });
      }

      const userHasCrop = await parcelDatamapper.findAllCropsInParcel(userId);

      res.json(userHasCrop);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // méthode pour sauvegarder la parcelle en base de données via un bouton sauvegarde sur le site
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
      // on boucle sur un tableau d'objet envoyé par le front pour sauvegarder
      // l'id des plants et leurs coordonnées ainsi que l'id de l'utilisateur connecté
      for (crop of userHasCrops) {
        // on regarde si l'info est déjà présente en BDD
        const userHasCropsReadingDB = await userHasCropDataMapper.findByInfo(crop);
        console.log('userhascropsreadingdb', JSON.stringify(userHasCropsReadingDB));
        console.log('crop', JSON.stringify(crop));
        // Si l'info est en BDD on passe
        if (JSON.stringify(userHasCropsReadingDB) === JSON.stringify(crop)) {
          console.log('déjà présent en bdd');
        } else {
          // si ce n'est pas en BDD on insére l'info en BDD
          const userHasCropInsert = await userHasCropDataMapper.insertSavedParcel(crop);
        }
      }
      res.send('Parcel bien sauvegardé');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // méthode pas utilisé pour le moment mais dans une version amélioré du site
  // méthode pour supprimer une parcelle dans le cas
  // d'implémentation de plusieurs parcelles pour un utilisateur
  async deleteParcel(req, res) {
    try {
      const userId = Number(req.params.user, 10);
      const userHasCrop = await userHasCropDataMapper.findByPk(userId);
      const deleteCropsFromParcel = await userHasCropDataMapper.delete(userId);
      console.log('All crops from parcel have been removed');
      res.send('deleteParcel');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // méthode pas utilisé pour le moment mais dans une version amélioré du site
  // méthode alternative à la sauvegarde de l'intégralité de la parcelle avec une sauvegarde
  // un par un à chaque placement de plant sur la parcelle
  async AddCropInParcel(req, res, next) {
    try {
      const cropId = parseInt(req.params.cropid, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }
      const crop = await cropDataMapper.findByPk(cropId);
      if (!crop) {
        return res.status(401).json({ message: 'This crop does not exists' });
      }

      const userid = parseInt(req.params.userid, 10);
      if (Number.isNaN(userid)) {
        return next();
      }
      const user = await userDataMapper.findByPK(userid);
      if (!user) {
        return res.status(401).json({ message: 'This user does not exists' });
      }
      // méthode pour chercher la parcelle de l'utilisateur connecté via son id
      const parcel = await parcelDatamapper.findParcelByUserId(userid);
      if (!parcel) {
        return res.status(401).json({ message: 'This parcel does not exists' });
      }
      // création d'un objet contenant toutes les informations pour
      // insérer un plant dans la parcelle de l'utilisateur
      const dataCrop = {
        user_id: user.id,
        crop_id: crop.id,
        parcel_id: parcel.id,
        position_x: req.body.position_x,
        position_y: req.body.position_y,
      };
      // méthode pour rechercher la position et savoir si elle est vide ou pas
      const filledBox = await userHasCropDataMapper.findPositionInParcel(dataCrop);
      // condition si position prise par un plant impossible de l'insérer
      if (filledBox) {
        return res.status(401).json({ message: 'This position is taken' });
      }

      await userHasCropDataMapper.insertCropInParcel(dataCrop);

      res.send(`crop ${cropId} ajouté dans la parcelle de ${user.user_name}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  // méthode pour supprimer un plant de la parcelle via son id
  async DeleteCropInParcel(req, res, next) {
    try {
      const cropId = parseInt(req.params.cropid, 10);
      if (Number.isNaN(cropId)) {
        return next();
      }
      const crop = await cropDataMapper.findByPk(cropId);
      if (!crop) {
        return res.status(401).json({ message: 'This crop does not exists' });
      }

      const userid = parseInt(req.params.userid, 10);
      if (Number.isNaN(userid)) {
        return next();
      }
      const user = await userDataMapper.findByPK(userid);
      if (!user) {
        return res.status(401).json({ message: 'This user does not exists' });
      }

      const parcel = await parcelDatamapper.findParcelByUserId(userid);
      if (!parcel) {
        return res.status(401).json({ message: 'This parcel does not exists' });
      }

      const dataCrop = {
        user_id: user.id,
        crop_id: crop.id,
        parcel_id: parcel.id,
        position_x: req.body.position_x,
        position_y: req.body.position_y,
      };
      // méthode pour retourner le plant si le plant est bien dans la position de laquelle
      // on veut le supprimer
      const cropInParceExist = await userHasCropDataMapper.findOneCropInParcel(dataCrop);

      if (!cropInParceExist) {
        return res.status(401).json({ message: `${crop.name} inexistante dans cette position  !` });
      }
      // méthode pour supprimer le légume de la parcelle dans la BDD
      await userHasCropDataMapper.deleteCropIntoParcel(dataCrop);

      res.send(` ${crop.name} en position_x${dataCrop.position_x}, position_y ${dataCrop.position_y} supprimé de la parcelle à ${user.user_name}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

};

module.exports = parcelController;
