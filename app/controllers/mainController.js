<<<<<<< HEAD
const res = require("express/lib/response");

const mainController = {
    // main page
    homePage(_, res) {
        res.send('home');
    },

    error404(req, res) {
        res.status(404).render('error404', { url: req.url });
    },

    showLoginPage(_, res) {
        res.send('loginpage');
    },

    login(req, res) {
        if (['mickey', 'donald', 'pluto'].includes(req.body.login)) {

            req.session.login = req.body.login;


        } else {
            res.send('login', { error: 'login invalide' });
        }
    },

    logout(req, res) {
        delete req.session.login;

        res.send('deconnexion réussi');
    }
};

module.exports = mainController;
=======
const userDataMapper = require('../models/user');


const mainController = {



    async getAllUsers(_, res) {
        const users = await userDataMapper.findAll();
        return res.json(users);
    },
    // main page
    homePage(_, res) {
        res.send('home');
    }};


    module.exports = mainController;
>>>>>>> 06-10-nordine
