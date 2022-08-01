import User from "../model/User.js";
import jwt  from "jsonwebtoken";
import config from '../config.js'
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
  try {
    // getting email and password from client
    const { email, password } = req.body; 

    // encrypting the password
    const hashedPassword = await bcrypt.hash(password, 12); 

    // creating a new User
    const user = new User({
      email,
      password: hashedPassword
    });

    // saving the new user
    const savedUser = await user.save();

    // signing new token
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
      expiresIn: 3600
    })
    // returning response to the client with generated token
    return res.status(200).json({
      token,
      message: 'signup successful'
    });
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (req, res) => {
  try {
    // finding user in DB
  const userFound = await User.findOne({email : req.body.email});

  // if user is not found returns a message
  if (!userFound) return res.json({ message: "user not found" });
  
  // validating password
  const validPassword = await bcrypt.compare(req.body.password, userFound.password)
  
  // if password is not valid returns response to client
  if (!validPassword) return res.status(401).json({token: null, message: 'invalid password'})
  
  // if signin is successful sign new token and sends response to client
  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 3600
  });

  res.status(200).json({ 
    token,
    message: 'signin successful'
   })
   
  } catch (error) {
    console.log(error);
  }
}
