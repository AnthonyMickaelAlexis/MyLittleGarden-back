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

    async insertSavedParcel(data) {
        console.log("test 1 insert parcel saved");
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
                data.user_id,
                data.crop_id,
                data.parcel_id,
                data.position_x,
                data.position_y
            ]
        }
        console.log("test 2 insert parcel saved");
        const result = await client.query(preparedQuery);
        console.log(result.rows[0]);
        return result.rows[0];
    },

    async findByInfo(data) {
        console.log("test 1 findbyinfo");
        const preparedQuery = {
            text: `
                SELECT * 
                FROM "user_has_crop"
                WHERE "parcel_id" = $1 AND "position_x"= $2 AND "position_y" = $3
            `,
            values: [
            data.parcel_id, data.position_x, data.position_y
            ]
        }
        console.log("test 2 findbyinfo");
        const result = await client.query(preparedQuery);
        console.log("result.rows[0] findByInfo from user_has_crop -------->", result.rows[0]) 
        return result.rows[0]
    },

    async update(data) {
        console.log("data ---->", data);
        const fields = Object.keys(data).map((prop) => `"${prop}"`);
        console.log("fields --->", fields);
        console.log("field length -------->", fields.length + 1);
        const request = await client.query(
            `
                UPDATE "user_has_crop" SET
                    crop_id = $1
                WHERE parcel_id = $2 AND position_x = $3 AND position_y = $4 
                RETURNING *
            `,
            [data.crop_id, data.parcel_id, data.position_x, data.position_y],
        );
        console.log("request rows index 0 ----->", request.rows[0]);
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
        return result.rows;
    }
    }