const client = require('../config/db');



module.exports = {



    async findAll() {
        
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },


    async findByPk(userId) {
       
        const result = await client.query('SELECT * FROM user WHERE id = $1', [userId]);

        return result.rows[0];
    },



    async delete(id) {
        const result = await client.query('DELETE FROM user WHERE id = $1', [id]);
        return !!result.rowCount;
    },

    async insert(data){
        const preparedQuery = {
            text: `
                INSERT INTO "user"
                (
                    "user_name",
                    "email",
                    "password"
                )
                VALUES ($1, $2, $3);
            `,
            values: [
                data.user_name,
                data.email,
                data.password
            ]
        }
        const result = await client.query(preparedQuery);
        return result.rowCount;
    },























};