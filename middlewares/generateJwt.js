const jwt = require('jsonwebtoken')


const generateJwt = (uid) => {
    return new Promise ((resolve, reject) => {
        const data = {uid: uid}
        jwt.sign(data, 'ieuf231whi5vew5hfl45ihliaeu3rg325hoai334weevoi5uwh', {
            rexpiresIn: '4h'
        }, (err, token) => {
            if(err){
                reject("Couldn't generate token")
            }else{
                resolve(token)
            }
        })
    })
}


module.exports = {
    generateJwt
}