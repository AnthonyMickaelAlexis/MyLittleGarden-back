const client = require('../config/db');



module.exports = {

    async insert(userId, parcelId) {
        console.log(typeof userId.id, userId.id, typeof parcelId.id, parcelId.id);
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
        console.log("insert user_has_crop 1");
        const result = await client.query(preparedQuery);
        console.log("insert user_has_crop datamapper passed");
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
        return result.rows;
    }
    }