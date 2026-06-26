const userModel = require("../Models/user");
const { verifyToken } = require("./jwtFuntions");

async function protect(req,res,next) {
    let token =req.headers.authorization.split(" ")[1];
    if(token){
        try {
            const decoded=verifyToken(token)
            req.user=await userModel.findById(decoded.id).select("-password")
            if(!req.user){
                return res.status(400).json({messege:"Token is wrong "})
            }
            next()
        } catch (error) {
            return res.status(400).json({
                error:`Authorization error ${error}`
            })
        }
    }
    else{
        return res.status(400).json({
            messege:"Token Not found"
        })
    }
}

function admin(req,res,next) {
    if(req.user && req.user.role ==="admin"){
        next();
    }
    else{
        return res.status(400).json({
            messege:"you are not authorized For this "
        })
    }
}

module.exports={protect,admin}