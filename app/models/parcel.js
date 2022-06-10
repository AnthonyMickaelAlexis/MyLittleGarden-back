const client = require('../config/db');



module.exports = {



    async findAll() {
        
        const result = await client.query('SELECT * FROM parcel');
        return result.rows;
    },


    async findByPk(parcelId) {
       
        const result = await client.query('SELECT * FROM user WHERE id = $1', [parcelId]);

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
