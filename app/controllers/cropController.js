const cropDataMapper = require('../models/crop');


const cropController = {

    async getAllCrops(_, res) {
        const crops = await cropDataMapper.findAll();
        return res.json(crops);
    },










};

module.exports = cropController