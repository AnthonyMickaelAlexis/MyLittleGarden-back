const userDataMapper = require('../models/user');
const bcrypt = require('bcrypt');

const helperController = {

    async checkUser(user_name, password) {
        const user = await userDataMapper.findByUserName(user_name);
        console.log(user);
        //... fetch user from a db etc.
    
    //     await bcrypt.compare(password, user.password, (err, result)) => {

    //         if(result) {
    //             console.log("c'est ok");
    //         } else (err) {
    //             console.error(err);
    //             res.send(err.message);
    //             console.log("Mauvais Mp");
    //         }
    
    //         //login
    
    //     //...
    // }
    bcrypt.compare(password, user.password,(err, result) => {
        if (!result) {
            console.log(err);

            
        }
    }





}
}

module.exports = helperController;