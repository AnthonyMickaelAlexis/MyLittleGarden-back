const userDataMapper = require('../models/user');
const helperController = require('./helperController');
const parcelDatamapper = require('../models/parcel');
const parcelController = require('../controllers/parcelController');
const userHasPlantDatamapper = require('../models/user_has_plant');


const bcrypt = require('bcrypt');


const userController = {

    // get login user
    loginUser(req,res) {
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
    async loginUserConnection(req,res) {
        try {
            const user = await userDataMapper.findByUserName(req.body.user_name);
            if (!user) {
                return res.send('user_name invalide')
            };
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
            return res.send('mot de passe invalide')
        };

        //On enregistre l'utilisateur en session
        // req.session.user = user;
            delete user.password;
            res.send(`Vous etes bien connecté ${user.user_name}`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // get register user
    async registeredUser(req,res) {
        try {
            res.send('loginUserPost');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // post register user
    async registerUserPost(req,res) {
        try {
            // Password encryptation
            let salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            // Inserting data of the user from FORM
            const dataUser =
            {
                user_name : req.body.user_name,
                firstname : req.body.firstname,
                lastname : req.body.lastname, 
                email : req.body.email, 
                password : hashedPassword
            };
            await userDataMapper.insert(dataUser);
            const userName = req.body.user_name;
            // Getting user Id
            const UserId = await userDataMapper.findByUserNameGetId(userName);
            // Creating user Parcel
            const createParcel = await parcelDatamapper.createParcel(userName);
            // Gettting parcel Id
            const parcelId = await parcelDatamapper.getParcelId(createParcel);
            // Use user Id and Parcel Id to create the entry on the linking table "user_has_crop"
            const createLinkingTable = await userHasPlantDatamapper.insert(UserId, parcelId);
            res.json(dataUser);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // get user profil
    async getUserProfil(req, res, next) {
        try{
            const userId = parseInt(req.params.user, 10);
            if (Number.isNaN(userId)) {
                return next();
            }

            const user = await userDataMapper.getOneUser(userId);
            if (!user) {
                return next();
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // patch user profil
    patchUserProfil(req, res) {
        try {
            res.send('postUserProfil');
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

            await userDataMapper.delete(userId);
            
            res.send(`utilisateur ${userId} a bien était supprimé`);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

};

module.exports = userController;