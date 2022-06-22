const parcelDatamapper = require('../models/parcel');
const userDataMapper = require('../models/user');
const cropDataMapper = require("../models/crop");
const userHasCropDataMapper = require("../models/user_has_plant");
const favoriteCropDataMapper = require('../models/favorite_crop');

const parcelController = {

    async getAllParcels(_, res) {
        const parcels = await parcelDatamapper.findAllParcels();
        return res.json(parcels);
    },


    
    
    // get request on page parcel
    async getUserParcel(req, res, next) {
        try {
            const userId = Number(req.params.user, 10);
            console.log(userId);
            if (Number.isNaN(userId)) {
                return next();
            }
            // const userHasCrop = await userHasCropDataMapper.findByPk(userId);
            const userHasCrop = await parcelDatamapper.findAllCropsInParcel(userId);
            // const parcel = await parcelDatamapper.getUserParcel(userHasCrop.parcel_id);
            // const user = await userDataMapper.getOneUser(userId);
            // const favoriteCrop = await favoriteCropDataMapper.findByPk(userId);
            // if (!parcel && !user) {
            //     return next();
            // }
            // console.log("userHasCrop --->", userHasCrop, "parcel --->", parcel, "user --->", user, "favoriteCrop --->", favoriteCrop);

            res.json(userHasCrop);
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
    },


    async AddCropInParcel(req, res, next) {
        try{
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
                return res.status(401).json({message:"Cet utilisateur n'existe pas !"});
            }

            const parcel = await parcelDatamapper.findParcelByUserId(userid);
            if (!parcel) {
                return res.status(401).json({message:"Cet parcel n'existe pas !"});
            }

            const dataParcel =
            {
                user_id : user.id,
                crop_id : cropId,
                parcel_id : parcel.id, 
                position_x : req.body.position_x, 
                position_y : req.body.position_y
            };
            
            // insertIntoParcel
            await userHasCropDataMapper.insertCropInParcel(dataParcel);
            
            res.send(`crop ${cropId} ajouté dans la parcelle de ${user.user_name}`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

}

module.exports = parcelController;