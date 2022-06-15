const cropDataMapper = require('../models/crop');


const cropController = {

    async getAllCrops(_, res) {
        const crops = await cropDataMapper.findAll();
        return res.json(crops);
    },

    async AddOneCrop(req, res) {

        try {
            
            const dataCrop =
            {
                name : req.body.name,
                crop_img : req.body.crop_img,
                description : req.body.description 
                
            };
            await cropDataMapper.insert(dataCrop);
            res.json(dataCrop);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }


    },











};

module.exports = cropController