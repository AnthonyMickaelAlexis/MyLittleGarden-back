/* eslint-disable consistent-return */
// on récupére bcrypt pour encrypter les mots de passe
const bcrypt = require('bcrypt');
// on récupére le module jsonwebtoken pour générer un token à chaque connexion et lui
// donner une durée de vie pour sécuriser la transmission d'infos entre back et front et
// bloquer certaines routes si le token est invalide
const jwt = require('jsonwebtoken');
const userDataMapper = require('../models/user');
const parcelDatamapper = require('../models/parcel');
const userHasPlantDatamapper = require('../models/user_has_plant');
// on récupére le schéma de joi pour la validation des infos transmis par l'utilisateur
const schemaRegister = require('../validation/register.schema');

const userController = {

  // méthode inutilisé
  loginUser(req, res) {
    try {
      res.send('loginUserPost');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  // méthode utilisé à des fins de tests pour récupérer l'intégralité des utilisateurs du site
  async getAllUsers(_, res) {
    const users = await userDataMapper.findAll();
    return res.json(users);
  },

  // méthode pour connecter un utilisateur enregistré au site
  async loginUserConnection(req, res) {
    try {
      // on cherche les infos de l'utilisateur via son nom dans la bdd
      const user = await userDataMapper.findByUserName(req.body.user_name);

      if (!user) {
        return res.status(401).json({ message: 'This account does not exist' });
      }
      // on compare le mot de passe qu'il a entré avec le mot de passe en BDD
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Bad password' });
      }
      // on créé un token avec jwt et avec les infos de l'utilisateur connecté
      const token = jwt.sign({
        id: user.id,
        user_name: user.user_name,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });
      // on envoie le token au front-end
      res.json({ access_token: token });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // méthode inutilisé
  async registeredUser(req, res) {
    try {
      res.send('loginUserPost');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // méthode pour enregistrer un utilisateur en bdd
  async registerUserPost(req, res) {
    try {
      // on récupére dans un objet les infos envoyés par le front
      const dataUser = {
        user_name: req.body.user_name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
      };
      // méthode pour check si les informations sont valides d'après la configuration de joi
      await schemaRegister.validateAsync(dataUser);
      // On hash le password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // On insére les donnéees de l'utilisateur depuis les formulaires
      const dataUserWithHashedPassword = {
        user_name: dataUser.user_name,
        firstname: dataUser.firstname,
        lastname: dataUser.lastname,
        email: dataUser.email,
        password: hashedPassword,
      };

      const userByUsername = await userDataMapper.findByUserName(dataUser.user_name);

      if (userByUsername) {
        return res.status(401).json({ message: `This username ${dataUser.user_name} already exists` });
      }

      const userByEmail = await userDataMapper.findByEmail(dataUser.email);

      if (userByEmail) {
        return res.status(401).json({ message: `An account with this email ${dataUser.email} already exists` });
      }

      // On verifie les données envoyés par l'utilisateur pas besoin de les stockers

      await userDataMapper.insert(dataUserWithHashedPassword);
      const userName = req.body.user_name;
      // Getting user Id
      const UserId = await userDataMapper.findByUserNameGetId(userName);
      // Creating user Parcel
      const createParcel = await parcelDatamapper.createParcel(userName);
      // Gettting parcel Id
      const parcelId = await parcelDatamapper.getParcelId(createParcel);
      // Use user Id and Parcel Id to create the entry on the linking table "user_has_crop"
      await userHasPlantDatamapper.insert(UserId, parcelId);

      res.json(dataUserWithHashedPassword);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // get user profil
  async getUserProfil(req, res, next) {
    try {
      const userId = parseInt(req.params.user, 10);
      if (Number.isNaN(userId)) {
        return next();
      }

      const user = await userDataMapper.findByPK(userId);
      if (!user) {
        return res.status(401).json({ message: 'This user does not exists' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // patch user profil
  async patchUserProfil(req, res) {
    try {
      const user = await userDataMapper.findByPK(req.params.userid);
      if (!user) {
        return res.status(401).json({ message: 'This user does not exists' });
      }

      const dataUser = {
        user_name: req.body.user_name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        new_password: req.body.new_password,
      };

      await schemaRegister.validateAsync(dataUser);
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Bad password' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.new_password, salt);

      const dataUserWithHashedPassword = {
        user_name: req.body.user_name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      };

      if (user.user_name !== dataUser.user_name) {
        const userByUsername = await userDataMapper.findByUserName(dataUser.user_name);

        if (userByUsername) {
          return res.status(401).json({ message: `This username ${dataUser.user_name} already exists` });
        }
      }

      if (user.email !== dataUser.email) {
        const userByEmail = await userDataMapper.findByEmail(dataUser.email);

        if (userByEmail) {
          return res.status(401).json({ message: `An account with this email ${dataUser.email} already exists` });
        }
      }

      // On verifie les données envoyés par l'utilisateur pas besoin de les stockers

      const savedUser = await userDataMapper.update(req.params.userid, dataUserWithHashedPassword);
      return res.json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // delete user from database
  async deleteUser(req, res, next) {
    try {
      const userId = parseInt(req.params.user, 10);
      if (Number.isNaN(userId)) {
        return next();
      }
      const user = await userDataMapper.findByPK(userId);
      if (!user) {
        return res.status(401).json({ message: 'This user does not exists' });
      }

      await userDataMapper.deleteDataForUserInTableUserHasCrop(userId);
      await userDataMapper.deleteDataForUserInTableFavoriteCrop(userId);
      await userDataMapper.delete(userId);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  forgotPassword(req, res) {
    try {
      console.log('test');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
};

module.exports = userController;
