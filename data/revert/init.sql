-- Revert MyLittleGarden:init from pg

BEGIN;

<<<<<<< HEAD
DROP TABLE IF EXISTS "user", "plant", "parcel", "user_has_plant";
=======
DROP TABLE IF EXISTS "user", "vegetable", "parcel";
>>>>>>> 06-09-micka

COMMIT;
