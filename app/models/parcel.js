const client = require('../config/db');

module.exports = {

  async findAllParcels() {
    const result = await client.query(
      `SELECT "user".user_name, parcel.*
        FROM user_has_crop 
        JOIN "parcel" ON "user_has_crop".parcel_id = "parcel".id
        JOIN "user" ON "user_has_crop".user_id = "user".id `,
    );
    return result.rows;
  },

  async findParcelByUserId(userId) {
    const result = await client.query(`SELECT parcel.*
             FROM user_has_crop 
             JOIN "parcel" ON "user_has_crop".parcel_id = "parcel".id
             JOIN "user" ON "user_has_crop".user_id = "user".id
             WHERE "user"."id" = $1`, [userId]);
    return result.rows[0];
  },

  async findByPk(parcelId) {
    const result = await client.query('SELECT * FROM "user" WHERE id = $1', [parcelId]);

    return result.rows[0];
  },

  async getUserParcel(parcelId) {
    const result = await client.query('SELECT * FROM "parcel" WHERE id = $1', [parcelId]);

    return result.rows[0];
  },

  async createParcel(userName) {
    const parcelName = `${userName} parcel`;
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
        5,
      ],
    };
    await client.query(preparedQuery);
    return parcelName;
  },

  async getParcelId(parcelName) {
    const preparedQuery = {
      text: `
                SELECT "id" FROM "parcel" 
                WHERE "name" = $1;`,
      values: [parcelName],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query('DELETE FROM parcel WHERE id = $1', [id]);
    return !!result.rowCount;
  },

  async insert(data) {
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
        data.height,
      ],
    };
    const result = await client.query(preparedQuery);
    return result.rowCount;
  },

  async findAllCropsInParcel(userId) {
    const result = await client.query(`SELECT "parcel".name,  crop.*, position_x, position_y
             FROM user_has_crop 
             JOIN "parcel" ON "user_has_crop".parcel_id = "parcel".id
             JOIN "crop" ON "user_has_crop".crop_id = "crop".id
             JOIN "user" ON "user_has_crop".user_id = "user".id
             WHERE "user"."id" = $1`, [userId]);
    return result.rows;
  },

  async modifyName(parcelId, parcelName) {
    const result = await client.query(`
            UPDATE "parcel"
            SET name = $1
            WHERE id = $2
            `, [parcelName, parcelId]);
    return result.rows[0];
  },
};
