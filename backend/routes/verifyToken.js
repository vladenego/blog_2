const jwt = require('jsonwebtoken')

module.exports = async function auth(req,res,next){
  const token = req.header('auth-token')
  // console.log(token);
  // console.log(token);
  
  if(!token || token === null) return res.status(401).send('Access denied')

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = verified;
    next()
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid token')
  }
}
