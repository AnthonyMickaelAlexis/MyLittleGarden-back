-- Revert MyLittleGarden:init from pg

BEGIN;

DROP TABLE IF EXISTS "user", "crop", "parcel", "user_has_plant", "plant";

COMMIT;
