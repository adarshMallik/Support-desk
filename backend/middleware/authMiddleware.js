const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const protect = asyncHandler(async (req,res,next) => {
     let token 

     if (
       req.headers.authorization &&
       req.headers.authorization.startsWith("Bearer")
     ) {
       try {
         //getting the token from the api [1] is used because the token is stored as the second parameter where [0] is Bearer
         token = req.headers.authorization.split(" ")[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // Get user from token with excluding the password from the userid embedded in token
         req.User = await User.findById(decoded.id).select("-password");

         next();
       } catch (error) {
         console.log(error);
         res.status(401);
         throw new Error("Not Authorized");
       }
     }

     if(!token)
     {
        res.status(401)
        throw new Error('Not Authorized')
     }
})

module.exports = {protect}