const parcelDatamapper = require('../models/parcel');
const userDataMapper = require('../models/user');
const cropDataMapper = require("../models/crop");
const userHasCropDataMapper = require("../models/user_has_plant");
const favoriteCropDataMapper = require('../models/favorite_crop');

const parcelController = {
    
    // get request on page parcel
    async getUserParcel(req, res, next) {
        try {
            const userId = Number(req.params.user, 10);
            console.log(userId);
            if (Number.isNaN(userId)) {
                return next();
            }
            const userHasCrop = await userHasCropDataMapper.findByPk(userId);
            console.log("userhascrop parcel id ---->", userHasCrop[0].parcel_id);
            const parcel = await parcelDatamapper.getUserParcel(userHasCrop[0].parcel_id);
            const user = await userDataMapper.findByPK(userId);
            const favoriteCrop = await favoriteCropDataMapper.findAllCropsFavorite(userId);
            const cropList = await cropDataMapper.findAll();
            if (!parcel && !user) {
                return next();
            }
            console.log("userHasCrop --->", userHasCrop, "parcel --->", parcel, "user --->", user, "favoriteCrop --->", favoriteCrop);

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
                user_id: 56,
                crop_id: 2,
                parcel_id: 43,
                position_x: 3,
                position_y: 3
              }, 
              {
                user_id: 56,
                crop_id: 2,
                parcel_id: 43,
                position_x: 0,
                position_y: 0
            }];
            for (key of userHasCrops) {
                let userHasCropsReadingDB = await userHasCropDataMapper.findByInfo(key);             
                if (userHasCropsReadingDB) {
                    console.log("userhascropreadingDB --------------->", userHasCropsReadingDB, "key -------->", key);
                    console.log("comparator", userHasCropsReadingDB.user_id, key.user_id, userHasCropsReadingDB.crop_id, key.crop_id,
                    userHasCropsReadingDB.parcel_id, key.parcel_id, userHasCropsReadingDB.position_x, key.position_x,
                    userHasCropsReadingDB.position_y, key.position_y);
                    if (
                        userHasCropsReadingDB.user_id !== key.user_id || 
                        userHasCropsReadingDB.crop_id !== key.crop_id || 
                        userHasCropsReadingDB.parcel_id !== key.parcel_id || 
                        userHasCropsReadingDB.position_x !== key.position_x || 
                        userHasCropsReadingDB.position_y !== key.position_y
                        ) 
                        {
                            console.log("Userhascropreadingdb: C'est différent");
                            let userHasCropTable = await userHasCropDataMapper.update(key);
                            console.log("userHasCropTableUpdate -->", userHasCropTable);
                    } else if (userHasCropsReadingDB.user_id === key.user_id || 
                        userHasCropsReadingDB.crop_id === key.crop_id || 
                        userHasCropsReadingDB.parcel_id === key.parcel_id || 
                        userHasCropsReadingDB.position_x === key.position_x || 
                        userHasCropsReadingDB.position_y === key.position_y){
                        console.log("Userhascropreadingdb: C'est pareil");
                    }
                } else {
                console.log("userHasCropInsert init");
                let userHasCropInsert = await userHasCropDataMapper.insertSavedParcel(key);
                console.log("userHasCropInsert --->", userHasCropInsert);
            }
        }
        res.send('Parcel bien sauvegardé');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // delete request on delete parcel
    async deleteParcel(req, res) {
        try {
            const userId = Number(req.params.user, 10);
            const userHasCrop = await userHasCropDataMapper.findByPk(userId);
            const deleteCropsFromParcel = await userHasCropDataMapper.delete(userId);
            console.log("All crops from parcel have been removed");
            res.send('deleteParcel');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

}

module.exports = parcelController;