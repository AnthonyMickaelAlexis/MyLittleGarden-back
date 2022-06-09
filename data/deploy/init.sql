-- Deploy MyLittleGarden:init to pg

BEGIN;



CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL
    
);

CREATE TABLE "vegetable" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    vegetable_img TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE "parcel" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    position_x TEXT NOT NULL,
    position_y TEXT NOT NULL,
    user_id int REFERENCES "user" (id),
    vegetable_id int REFERENCES "vegetable" (id)
);


COMMIT;
