const userDataMapper = require('../models/user');
const helperController = require('./helperController');

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

            const dataUser =
            {
                user_name : req.body.user_name,
                password : req.body.password
            };
            // console.log("1");
            // const user = await userDataMapper.findByUserName(dataUser.user_name);
            // console.log("user ------->", user);
            // console.log("user password -------> ", dataUser.password);
            // const hash = await bcrypt.compare(dataUser.password, user.password);
            // console.log("hash -------->", hash);
            helperController.checkUser(dataUser.user_name, dataUser.password);
            res.json(user);
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
            let salt = await bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt);
            const dataUser =
            {
                user_name : req.body.user_name,
                firstname : req.body.firstname,
                lastname : req.body.lastname, 
                email : req.body.email, 
                password : hash
            };
            await userDataMapper.insert(dataUser);
            res.json(dataUser);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // get user profil
    async getUserProfil(req, res) {
        try {
            console.log("test");
            const id = parseInt(req.params.user, 10);
            const result = await userDataMapper.getOneUser(id);
            const dataUser = {
                user_name : req.body.user_name,
                firstname : req.body.firstname,
                lastname : req.body.lastname, 
                email : req.body.email, 
                password : hash
            }
            console.log(dataUser);
            res.send('getUserProfil');
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
    deleteUser(req, res) {
        try {
            res.send('deleteUser');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }

};

module.exports = userController;