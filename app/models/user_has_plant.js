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

    async insertSavedParcel(userId, cropId, parcelId, position_x, position_y) {
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
                userId,
                cropId,
                parcelId,
                position_x,
                position_y
            ]
        }
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },

    async findByInfo(data) {
        const preparedQuery = {
            text: `
                SELECT * FROM "user_has_crop"
                WHERE user_id = $1
            `,
            values: [
            data.user_id
            ]
        }
        const result = await client.query(preparedQuery);
        return result.rows[0]
    },

    async update(data) {
        const fields = Object.keys(data).map((prop, index) => `"${prop}" = $${index + 1}`);
        console.log(fields);
        const values = Object.values(data);
        console.log(values)
        const request = await client.query(
            `
                UPDATE "user_has_crop" SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return request.rows[0];
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
    }
    }