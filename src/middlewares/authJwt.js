import jwt  from "jsonwebtoken";
import config from "../config.js";
import User from "../model/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    // getting token from request headers
    const token = req.headers["x-access-token"];
  
    // checks if a token is provided, if not sends a response to the client
    if(!token) res.status(403).json({message: 'no token provided'})
    // if token is found then token gets decoded
    const decoded = jwt.verify(token, config.SECRET)

    // setting user id for that token
    req.userId = decoded.id;
    // finding the user in DB
    const user = await User.findById(req.userId, { password: 0 })
    
    // if no user is found sends response to the client
    if(!user) return res.status(404).json({message: 'no user found'})
    next();
  } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' })
  }
}