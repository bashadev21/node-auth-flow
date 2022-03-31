const jwt=require('jsonwebtoken')

const generateToken = (name,email) => {
    return jwt.sign({name:name,email:email}, process.env.JWT_SECRET,{
        
        expiresIn: 21600 //6 hours = 21600 sec
    })
}

module.exports = generateToken