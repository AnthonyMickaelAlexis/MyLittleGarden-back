-- Revert MyLittleGarden:init from pg

BEGIN;

DROP TABLE IF EXISTS "user", "plant", "parcel", "user_has_plant";

COMMIT;
