const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const auth = require('../auth')
const app = express()
const {registerValidation} = require('../validation');
// const {loginValidation} = require('../validation');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

router.post('/', async (req, res) => {
  try {
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({ email: req.body.email})
    if (emailExist) return res.status(400).send('Email already exist')

    //Hash a password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // CREATE A NEW USER
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    })

    console.log(user);

    const savedUser = await user.save();
    res.send(savedUser);

  } catch (error) {
    res.status(400).send(error)
  }


})

router.get('/', (req,res) => {
  res.send('registratioon')
})


module.exports = router
