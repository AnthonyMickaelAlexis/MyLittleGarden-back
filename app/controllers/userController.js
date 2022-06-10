const userDataMapper = require('../models/user')

const userController = {

    // get login user
    loginUser(req,res) {
        try {
            res.send('loginUser');
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
    loginUserConnection(req,res) {
        try {
            res.send('loginUserPost');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // get register user
    async registerUser(req,res) {
        try {
            await userDataMapper.insert(req.body)
            res.redirect('/login');
            res.send('registerUser');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // post register user
    registerUserPost(req,res) {
        try {
            res.send('registerUserPost');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    // get user profil
    getUserProfil(req, res) {
        try{
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