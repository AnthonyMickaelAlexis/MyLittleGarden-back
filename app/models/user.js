const client = require('../config/db');
const bcrypt = require('bcrypt');


module.exports = {



    async findAll() {
        
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },


    async findByUserName(user_name) {
       
        const preparedQuery = {
            text: `
                SELECT * FROM "user" 
                WHERE user_name = $1;`, 
                values: [user_name]
                };
        const result = await client.query(preparedQuery);
        console.log(result.rowCount);
        return result.rows;
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
                    "firstname",
                    "lastname",
                    "email",
                    "password"
                )
                VALUES ($1, $2, $3, $4, $5);
            `,
            values: [
                data.user_name,
                data.firstname,
                data.lastname,
                data.email,
                data.password
            ]
        }
        const result = await client.query(preparedQuery);
        return result.rowCount;
    },

    async update (data) {
        const preparedQuery = {
            text: `
                UPDATE "user"
                (
                SET "user_name",
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

    async getOneUser(id) {
        const preparedQuery = {
            text: `SELECT * 
            FROM "user" 
            WHERE id = $1`, 
            values: [
                id
            ]
        }
        const result = await client.query(preparedQuery);
        console.log(result.rows[0]);
        return result.rows[0];
    }
    /*  
    name: jeanbon
    email: jeanbon@lemail.mail
    password: ******************
    
    
    
    
    UPDATE nom_table
SET champ1 = 'nouvelle valeur'
[WHERE condition]

UPDATE table
SET colonne_1 = 'valeur 1', colonne_2 = 'valeur 2', colonne_3 = 'valeur 3'
WHERE condition

        */























};