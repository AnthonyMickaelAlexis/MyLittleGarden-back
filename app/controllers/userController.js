/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDataMapper = require('../models/user');
const parcelDatamapper = require('../models/parcel');
const userHasPlantDatamapper = require('../models/user_has_plant');
const schemaRegister = require('../validation/register.schema');

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
        return res.status(401).json({ message: 'This account does not exist' });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Bad password' });
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
      const dataUser = {
        user_name: req.body.user_name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
      };

      await schemaRegister.validateAsync(dataUser);
      // Password encryptation
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Inserting data of the user from FORM
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

      const userByUsername = await userDataMapper.findByUserName(dataUser.user_name);

      if (userByUsername) {
        return res.status(401).json({ message: `This username ${dataUser.user_name} already exists` });
      }

      const userByEmail = await userDataMapper.findByEmail(dataUser.email);

      if (userByEmail) {
        return res.status(401).json({ message: `An account with this email ${dataUser.email} already exists` });
      }

      // On verifie les données envoyés par l'utilisateur pas besoin de les stockers

      const savedUser = await userDataMapper.update(req.params.userid, dataUserWithHashedPassword);
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
