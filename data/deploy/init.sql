-- Deploy MyLittleGarden:init to pg

BEGIN;



CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL
    
);

CREATE TABLE "plant" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    plant_img TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE "parcel" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    width INT,
    height INT
);



CREATE TABLE "user_has_plant" (
    user_id int REFERENCES "user" (id),
    plant_id int REFERENCES "plant" (id),
    parcel_id int REFERENCES "parcel" (id),
    position_x TEXT NOT NULL,
    position_y TEXT NOT NULL
);

COMMIT;
