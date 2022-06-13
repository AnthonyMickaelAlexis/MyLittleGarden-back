-- Deploy MyLittleGarden:init to pg

BEGIN;



CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name text NOT NULL UNIQUE,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
    
);

CREATE TABLE "crop" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    crop_img TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE "parcel" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    width INT,
    height INT
);




CREATE TABLE "user_has_crop" (
    user_id int REFERENCES "user" (id),
    crop_id int REFERENCES "crop" (id),
    parcel_id int REFERENCES "parcel" (id),
    position_x INT,
    position_y INT,
    PRIMARY KEY (parcel_id, position_x, position_y)
);
CREATE TABLE "favorite_crop" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int REFERENCES "user" (id),
    crop_id int REFERENCES "crop" (id)
);

COMMIT;
