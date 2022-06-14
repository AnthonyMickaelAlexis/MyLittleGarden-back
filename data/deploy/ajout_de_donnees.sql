-- Deploy MyLittleGarden:ajout_de_donnees to pg

BEGIN;

INSERT INTO "user" ("user_name", "email", "password") VALUES
('mlg', 'mlg@yopmail.com', 'mlg');


<<<<<<< HEAD
INSERT INTO "plant" ("name", "plant_img", "description") VALUES
=======
INSERT INTO "vegetable" ("name", "vegetable_img", "description") VALUES
>>>>>>> 06-09-micka
('Tomates', '/img/tomate.jpg', 'La tomate (Solanum lycopersicum L.) est une espèce de plantes herbacées du genre Solanum de la famille des Solanacées, originaire du Nord-Ouest de l''Amérique du Sud, largement cultivée pour son fruit. 
Le terme désigne aussi ce fruit charnu. La tomate se consomme comme un légume-fruit, crue ou cuite. Elle est devenue un élément incontournable de la gastronomie dans de nombreux pays, et tout particulièrement dans le bassin méditerranéen.'),
('Aubergine', '/img/aubergine.jpg', 'L''aubergine (Solanum melongena L.) est une plante dicotylédone de la famille des Solanaceae, cultivée pour son légume-fruit. Le terme aubergine désigne la plante et le fruit.');


<<<<<<< HEAD
INSERT INTO "parcel" ("name", "width", "height") VALUES
=======
INSERT INTO "parcel" ("name", "position_x", "position_y") VALUES
>>>>>>> 06-09-micka
('garden1', '1', '2'),
('garden2', '1', '2'),
('garden3', '1', '2');
COMMIT;
