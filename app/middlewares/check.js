const jwt = require('jsonwebtoken');




// Extraction du token

const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }

    // on isole le token


    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]



}







// Vérification de la présence du token



const checkTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if(!token) {
        return res.status(401).json({ message: 'Pas de Token, Pas de route'})
    }

    // Vérifie la validité du token

    jwt.verify(token, "laphrasesuperlonguequecestdifficiledelatrouver", (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: 'Bad Token'})
        }

        next()
    })

}






module.exports = checkTokenMiddleware;