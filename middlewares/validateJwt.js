const jwt = require("jsonwebtoken")

const validateJwt = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({message: "Token not found"})

    }

    try {
        const {uid} = jwt.verify(token, 'ieuf231whi5vew5hfl45ihliaeu3rg325hoai334weevoi5uwh')
        req.uid = uid

    } catch(error) {
        res.status(401).json({message: "Inalid token"})
    }
    next()
}

module.exports = {
    validateJwt: validateJwt
}