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


    async findPositionInParcel(dataCrop) {

        const result = await client.query(`
        SELECT * 
        FROM "user_has_crop"
        WHERE "parcel_id" = $1
        AND "position_x" = $2
        AND "position_y" = $3
        `, 
        [
            dataCrop.parcel_id,
            dataCrop.position_x,
            dataCrop.position_y
        ]
    );
    return result.rows[0];


    },

    async findOneCropInParcel(dataCrop) {

        const result = await client.query(`
        SELECT * 
        FROM "user_has_crop"
        WHERE "user_id" = $1
        AND "crop_id" = $2
        AND "parcel_id" = $3
        AND "position_x" = $4
        AND "position_y" = $5
        `, 
        [
            dataCrop.user_id,
            dataCrop.crop_id,
            dataCrop.parcel_id,
            dataCrop.position_x,
            dataCrop.position_y
        ]
    );
    return result.rows[0];


    },

    async insertCropInParcel(dataCrop) {
        
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
                dataCrop.user_id,
                dataCrop.crop_id,
                dataCrop.parcel_id,
                dataCrop.position_x,
                dataCrop.position_y
            ]
        }
        
        const result = await client.query(preparedQuery);
        
        return result.rows[0];
    },

    async deleteCropIntoParcel(dataCrop){
        const preparedQuery = {
            text: `

        
            DELETE FROM "user_has_crop" 
            WHERE "crop_id" = ${dataCrop.crop_id}
            AND  "user_id" = ${dataCrop.user_id}
            AND "parcel_id" = ${dataCrop.parcel_id}
            AND "position_x" = ${dataCrop.position_x}
            AND "position_y" = ${dataCrop.position_y}
           ;`
        }
        const result = await client.query(preparedQuery);
        return result.rowCount;
    },

    }