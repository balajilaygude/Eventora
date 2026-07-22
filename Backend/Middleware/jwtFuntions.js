const jwt=require("jsonwebtoken")


function generateToken(id,role) {
    const token=jwt.sign({id,role},process.env.SECRET,{expiresIn:"7d"});
    return token
}

function verifyToken(token){
    const decoded=jwt.verify(token,process.env.SECRET)
    return decoded
}


module.exports={generateToken,verifyToken}