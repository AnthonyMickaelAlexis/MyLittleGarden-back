/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDataMapper = require('../models/user');
const parcelDatamapper = require('../models/parcel');
const userHasPlantDatamapper = require('../models/user_has_plant');
const schemaRegister = require('../validation/register.schema');
const { ApiError } = require('../helpers/errorHandler');

const userController = {

  // get login user
  loginUser(req, res) {
    try {
      res.send('loginUserPost');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  // test getting allusers
  async getAllUsers(_, res) {
    const users = await userDataMapper.findAll();
    return res.json(users);
  },

  // post login user
  async loginUserConnection(req, res) {
    try {
      const user = await userDataMapper.findByUserName(req.body.user_name);

      if (!user) {
        throw new ApiError('This account does not exist', { statusCode: 404 });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        throw new ApiError('Bad password', { statusCode: 404 });
      }

      const token = jwt.sign({
        id: user.id,
        user_name: user.user_name,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });

      res.json({ access_token: token });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // get register user
  async registeredUser(req, res) {
    try {
      res.send('loginUserPost');
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  // post register user
  async registerUserPost(req, res) {
    try {
      // Password encryptation
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Inserting data of the user from FORM
      const dataUser = {
        user_name: req.body.user_name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      };

      const userByUsername = await userDataMapper.findByUserName(dataUser.user_name);

      if (userByUsername) {
        throw new ApiError(`This username ${dataUser.user_name} already exists`, { statusCode: 404 });
      }

      const userByEmail = await userDataMapper.findByEmail(dataUser.email);

      if (userByEmail) {
        throw new ApiError(`An account with this email ${dataUser.email} already exists`, { statusCode: 404 });
      }

      // On verifie les données envoyés par l'utilisateur pas besoin de les stockers

      await schemaRegister.validateAsync(dataUser);

      await userDataMapper.insert(dataUser);
      const userName = req.body.user_name;
      // Getting user Id
      const UserId = await userDataMapper.findByUserNameGetId(userName);
      // Creating user Parcel
      const createParcel = await parcelDatamapper.createParcel(userName);
      // Gettting parcel Id
      const parcelId = await parcelDatamapper.getParcelId(createParcel);
      // Use user Id and Parcel Id to create the entry on the linking table "user_has_crop"
      await userHasPlantDatamapper.insert(UserId, parcelId);

      res.json(dataUser);
    } catch (err) {
      console.error(err);
      res.json({ error: err.details[0].message });
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
        throw new ApiError('This user does not exists', { statusCode: 404 });
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
        throw new ApiError('This user does not exists', { statusCode: 404 });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const dataUser = {
        user_name: req.body.user_name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      };

      const userByUsername = await userDataMapper.findByUserName(dataUser.user_name);

      if (userByUsername) {
        return res.status(401).json({ message: `${dataUser.user_name} existe deja !` });
      }

      const userByEmail = await userDataMapper.findByEmail(dataUser.email);

      if (userByEmail) {
        return res.status(401).json({ message: `Un Compte avec cet email : ${dataUser.email} est deja crée ` });
      }

      // On verifie les données envoyés par l'utilisateur pas besoin de les stockers

      await schemaRegister.validateAsync(dataUser);

      const savedUser = await userDataMapper.update(req.params.userid, dataUser);
      return res.json(savedUser);
    } catch (err) {
      console.error(err);
      res.json({ error: err.details[0].message });
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
        throw new ApiError('This user does not exists', { statusCode: 404 });
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
