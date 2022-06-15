const parcelDatamapper = require('../models/parcel');

const parcelController = {
    // get request on page parcel
    async getUserParcel(req, res) {
        try {
            const userId = parseInt(req.params.user, 10);
            if (Number.isNaN(userId)) {
                return next();
            }

            const parcel = await parcelDatamapper.getUserParcel(userId);
            if (!parcel) {
                return next();
            }
            res.json(parcel);
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

};

module.exports = parcelController;