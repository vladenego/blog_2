const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const {loginValidation} = require('../validation');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()


router.get('/', (req,res) => {


  res.send('this is login page')
})

router.post('/', async (req,res) => {

  
  // JUST VALIDATE USER DATA 
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECK IF THE USER IS ALREADY EXISTS
  const user = await User.findOne({email: req.body.email});
  // console.log(user);
  if (!user) return res.status(400).send("Your email does not exist")
  console.log("here");
  
  // CHECK IF THE USER PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email or password incorrect")

  //Create and assing token
  const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
  res.header('auth-token', token).status(200).send(token)
  // res.status(200).send(token)
  console.log(token);
  
  res.send("Logged in!")
})




module.exports = router;
