const cropDataMapper = require('../models/crop');


const cropController = {

    async getAllCrops(_, res) {
        const crops = await cropDataMapper.findAll();
        return res.json(crops);
    },


    async getOneCrop(req, res, next) {
        try{
            const cropId = parseInt(req.params.id, 10);
            if (Number.isNaN(cropId)) {
                return next();
            }

            const crop = await cropDataMapper.findByPk(cropId);
            if (!crop) {
                return next();
            }
            res.json(crop);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
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

    async deleteCrop(req, res, next) {
        try {
            
            const cropId = parseInt(req.params.id, 10);
            if (Number.isNaN(cropId)) {
                return next();
            }

            await cropDataMapper.delete(cropId);
            
            res.send(` le crop ${cropId} a bien était supprimé`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }











};

module.exports = cropController