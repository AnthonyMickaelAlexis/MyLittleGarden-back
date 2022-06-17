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
            const user = await userDataMapper.findByPK(userId);
            const favoriteCrop = await favoriteCropDataMapper.findByUserPk(userId);
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
    patchUserParcel(req, res) {
        try {
            res.send('postUserParcel');
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