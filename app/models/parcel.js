const { Client } = require('pg');
const client = require('../config/db');



module.exports = {



    async findAll() {
        
        const result = await client.query('SELECT * FROM parcel');
        return result.rows;
    },


    async findByPk(parcelId) {
       
        const result = await client.query('SELECT * FROM "user" WHERE id = $1', [parcelId]);

        return result.rows[0];
    },

    async getUserParcel(userId) {

        const userHasCrop = await client.query(`SELECT * FROM 'user_has_crop' WHERE id = $1`, [userId]);
        const parcel = await client.query(`SELECT * FROM 'parcel' WHERE id = $1`, [userHasCrop.parcel_id]);
        const user = await client.query(`SELECT * FROM "user" WHERE id = $1`, [userHasCrop.user_id]);
        const favorite_crop = await client.query(`SELECT * FROM "favorite_crop" WHERE user_id = $1`, [userHasCrop.user_id])
        

        return userHasCrop, parcel, user, favorite_crop;
    },

    async createParcel(userName) {
        const parcelName = userName + " " + "Parcel";
        console.log(parcelName);
        console.log(typeof parcelName);
        const preparedQuery = {
            text: `
                INSERT INTO "parcel"
                (
                    "name",
                    "width",
                    "height"
                )
                VALUES ($1, $2, $3);
            `,
            values: [
                parcelName,
                8,
                5
            ]
        }
        const result = await client.query(preparedQuery);
        return parcelName;
    },

    async getParcelId(parcelName) {
        const preparedQuery = {
            text: `
                SELECT "id" FROM "parcel" 
                WHERE "name" = $1;`, 
                values: [parcelName]
                };
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },
    
    async delete(id) {
        const result = await client.query('DELETE FROM parcel WHERE id = $1', [id]);
        return !!result.rowCount;
    },

    async insert(data){
        const preparedQuery = {
            text: `
                INSERT INTO "parcel"
                (
                    "name",
                    "width",
                    "height"
                )
                VALUES ($1, $2, $3);
            `,
            values: [
                data.name,
                data.width,
                data.height
            ]
        }
        const result = await client.query(preparedQuery);
        return result.rowCount;
    },
};