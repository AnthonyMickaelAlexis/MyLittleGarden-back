const userController = {

    //get loginUser
    loginUser(req,res) {
        res.send('loginUser');
    },
    //post loginUser
    loginUserConnection(req,res) {
        res.send('loginUserPost');
    },
    //get registerUser
    registerUser(req,res) {
        res.send('registerUser');
    },
    //post registerUser
    registerUserPost(req,res) {
        res.send('registerUserPost');
    },
    
};

module.exports = userController;