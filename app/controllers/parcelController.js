const parcelDatamapper = require('../models/parcel');
const userDataMapper = require('../models/user');
const cropDataMapper = require("../models/crop");
const userHasCropDataMapper = require("../models/user_has_plant");
const favoriteCropDataMapper = require('../models/favorite_crop');

const parcelController = {
    
    // get request on page parcel
    async getUserParcel(req, res, next) {
        try {
            console.log("test");
            const userId = req.params.user.id;
            console.log(userId);
            if (Number.isNaN(userId)) {
                return next();
            }
            const userHasCrop = await userHasCropDataMapper.findByPk(userId);
            const parcel = await parcelDatamapper.getUserParcel(userId);
            const user = await userDataMapper.getOneUser(userId);
            const favoriteCrop = await favoriteCropDataMapper.findByPk(userId);
            if (!parcel && !user) {
                return next();
            }
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