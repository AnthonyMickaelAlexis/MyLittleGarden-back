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
            console.log(userHasCrop.parcel_id);
            const parcel = await parcelDatamapper.getUserParcel(userHasCrop.parcel_id);
            const user = await userDataMapper.getOneUser(userId);
            const favoriteCrop = await favoriteCropDataMapper.findByPk(userId);
            if (!parcel && !user) {
                return next();
            }
            console.log("userHasCrop --->", userHasCrop, "parcel --->", parcel, "user --->", user, "favoriteCrop --->", favoriteCrop);

            res.json("userHasCrop --->", userHasCrop, "parcel --->", parcel, "user", user, "favoriteCrop", favoriteCrop);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // patch request on page parcel
    async patchUserParcel(req, res) {
        try {
            const userHasCrops = [{user_id: 48,crop_id: 1,parcel_id: 2,position_x: 0,position_y: 0}, {user_id: 48,crop_id: 1,parcel_id:2,position_x: 1,position_y: 1}];
            console.log("test 1");
            for (key of userHasCrop) {
                console.log("test 2");
                    console.log("test 3");
                    let userHasCropsReadingDB = await userHasCropDataMapper.findByInfo(key);    
                    console.log("test 4");          
                    if (userHasCropsReadingDB) {
                    let userHasCropTable = await userHasCropDataMapper.update(key);
                    console.log(userHasCropTable);
                    } else {
                    let userHasCropInsert = await userHasCropDataMapper.insertSavedParcel(key);
                    console.log(userHasCropInsert);
                    }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // delete request on delete parcel
    deleteParcel(req, res) {
        try {
            res.send('deleteParcel');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

}

module.exports = parcelController;