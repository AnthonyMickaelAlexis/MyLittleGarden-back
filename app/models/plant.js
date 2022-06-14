const client = require('../config/db');



module.exports = {



    async findAll() {
        
        const result = await client.query('SELECT * FROM plant');
        return result.rows;
    },


    async findByPk(plantId) {
       
        const result = await client.query('SELECT * FROM user WHERE id = $1', [plantId]);

        return result.rows[0];
    },


    async delete(id) {
        const result = await client.query('DELETE FROM plant WHERE id = $1', [id]);
        return !!result.rowCount;
    },

    async insert(data){
        const preparedQuery = {
            text: `
                INSERT INTO "plant"
                (
                    "name",
                    "plant_img",
                    "description"
                )
                VALUES ($1, $2, $3);
            `,
            values: [
                data.name,
                data.plant_img,
                data.description
            ]
        }
        const result = await client.query(preparedQuery);
        return result.rowCount;
    },
};