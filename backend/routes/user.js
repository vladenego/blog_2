const router = require('express').Router()
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('../models/User.model')


router.get('/', verify, async (req,res) => {
 try {
  const token =  req.header('auth-token')

  var decoded = jwt.verify(token, process.env.SECRET_TOKEN );
  console.log(decoded) 

  const getUser = await User.findOne({_id: decoded._id})
  res.send(getUser)

 } catch (error) {
   console.log(error);
   
 }
})


module.exports = router
