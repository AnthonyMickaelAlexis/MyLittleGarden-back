-- Revert MyLittleGarden:init from pg

BEGIN;

DROP TABLE IF EXISTS "user", "vegetable", "parcel";

COMMIT;
