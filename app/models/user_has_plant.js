const client = require('../config/db');



module.exports = {

    async insert(getUserId, parcelId) {
        
        const preparedQuery = {
            text: `
                INSERT INTO "user_has_crop"
                (
                    "user_id",
                    "parcel_id",
                )
                VALUES ($1, $2);
            `,
            values: [
                getUserId,
                parcelId,
            ]
        }
        console.log("insert user_has_crop 1");
        const result = await client.query(preparedQuery);
        console.log("insert user_has_crop datamapper passed");
        return result.rowCount;
    }
    }