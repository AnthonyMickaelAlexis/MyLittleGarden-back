-- Deploy MyLittleGarden:init to pg

BEGIN;



CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL
    
);

<<<<<<< HEAD
CREATE TABLE "plant" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    plant_img TEXT NOT NULL,
=======
CREATE TABLE "vegetable" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    vegetable_img TEXT NOT NULL,
>>>>>>> 06-09-micka
    description TEXT NOT NULL
);

CREATE TABLE "parcel" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
<<<<<<< HEAD
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

=======
    position_x TEXT NOT NULL,
    position_y TEXT NOT NULL,
    user_id int REFERENCES "user" (id),
    vegetable_id int REFERENCES "vegetable" (id)
);


>>>>>>> 06-09-micka
COMMIT;
