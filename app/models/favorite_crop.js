const client = require('../config/db');



module.exports = {

    async findByPk(userId) {
       
        const result = await client.query(`SELECT * FROM "favorite_crop" WHERE user_id = $1`, [userId]);

        return result.rows[0];
    }
}
