const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const Post = require('./models/Post.model')
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.use(cors())
app.use(morgan('dev'));
app.use(express.static('public'))


//ROUTES
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const dashboardRouter = require('./routes/dashboard')
const userRouter = require('./routes/user')
const createPost = require('./routes/createPost')

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/dashboard', dashboardRouter)
app.use('/user', userRouter)
app.use('/createPost', createPost)




// MAIN PAGE
app.get('/', async (req,res) => {
  try {

    const fetchedPost = await Post.find();
    res.send(fetchedPost)
    
  } catch (error) {
    res.status(400).send()
  }

app.post('/', (req, res) => {

  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  post.save()
  .then(data => res.json(data))
  .catch(error => console.log(error))

})

  res.send("hello")
})


app.get('/:id', async (req,res) => {
  console.log(req.body);
  
  try {
    const fetchPostById = await Post.findOne({_id: req.params.id})
    res.send(fetchPostById)
    
  } catch (error) {
    res.send('There is no such post, bitch!')
  }

  res.send("just post page")
})

// CONNECT TO DB FROM SUPPORT
// mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true });


// LISTEN SERVER
app.listen(3001)

