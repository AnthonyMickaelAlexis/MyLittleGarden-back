// const userDatamapper = require('../middlewares/user')

const userController = {

    //get loginUser
    loginUser(req,res) {
        try {
            res.send('loginUser');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    //post loginUser
    loginUserConnection(req,res) {
        try {
            res.send('loginUserPost');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    //get registerUser
    async registerUser(req,res) {
        try {
            await userDatamapper.insert(req.body)
            res.redirect('/login');
            res.send('registerUser');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    //post registerUser
    registerUserPost(req,res) {
        try {
            res.send('registerUserPost');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    //get userProfil
    getUserProfil(req, res) {
        try{
            res.send('getUserProfil');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    patchUserProfil(req, res) {
        try {
            res.send('postUserProfil');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

    getUserParcel(req, res) {
        try {
            res.send('getUserParcel');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
    postUserParcel(req, res) {
        try {
            res.send('postUserParcel');
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },
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