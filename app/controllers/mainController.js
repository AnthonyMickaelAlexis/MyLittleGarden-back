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