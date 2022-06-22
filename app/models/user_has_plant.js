const client = require('../config/db');



module.exports = {

    async insert(userId, parcelId) {
        
        const preparedQuery = {
            text: `
                INSERT INTO "user_has_crop"
                (
                    "user_id",
                    "parcel_id",
                    "position_x",
                    "position_y"
                )
                VALUES ($1, $2, $3, $4);
            `,
            values: [
                userId.id,
                parcelId.id,
                0,
                0
            ]
        }
        
        const result = await client.query(preparedQuery);
        
        return result.rows[0];
    },

    async findByPk(userId) {
        const result = await client.query(`
            SELECT * 
            FROM "user_has_crop"
            WHERE "user_id" = $1
            `, 
            [
                userId
            ]
        );
        return result.rows[0];
    },

    async insertCropInParcel(dataParcel) {
        
        const preparedQuery = {
            text: `
                INSERT INTO "user_has_crop"
                (
                    "user_id",
                    "crop_id",
                    "parcel_id",
                    "position_x",
                    "position_y"
                )
                VALUES ($1, $2, $3, $4, $5);
            `,
            values: [
                dataParcel.user_id,
                dataParcel.crop_id,
                dataParcel.parcel_id,
                dataParcel.position_x,
                dataParcel.position_y
            ]
        }
        
        const result = await client.query(preparedQuery);
        
        return result.rows[0];
    },

    }