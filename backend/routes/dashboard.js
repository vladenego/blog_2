const router = require('express').Router()
const verify = require('./verifyToken')


router.get('/', verify, (req,res) => {
  console.log("This is dashboard");
  
  res.send("This is dashboard")
})

module.exports =  router
