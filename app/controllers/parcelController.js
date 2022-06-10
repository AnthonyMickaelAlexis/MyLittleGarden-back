// const userDatamapper = require('../middlewares/user')

const parcelController = {

    getUserParcel(req, res) {
        try {
            res.send('getUserParcel');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    patchUserParcel(req, res) {
        try {
            res.send('postUserParcel');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
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