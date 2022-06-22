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

    async getUserParcel(parcelId) {

        
        const result = await client.query(`SELECT * FROM "parcel" WHERE id = $1`, [parcelId]);        

        return result.rows[0];
    },

    async createParcel(userName) {
        const parcelName = userName + " " + "parcel";
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

    patchUserParcel(id){
        console.log("patchuserparcel");
    }
};