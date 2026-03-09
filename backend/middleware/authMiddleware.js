const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    //check cookies
    if(req.cookies && req.cookies.token){
        try{
            token = req.cookies.token;
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user from token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }else{
        res.status(401).json({ message: "Not authorized, no token" });
    }
}

module.exports = { protect };