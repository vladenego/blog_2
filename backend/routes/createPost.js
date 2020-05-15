const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../models/Post.model')
const multer = require('multer')


// MULTER


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({storage: storage}).single('file')



router.post('/', verify,  (req, res) => {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).send(req.file)

  })




  // try {
  //   // console.log(res.body.postAvatarPath);
  //   console.log(req.files);


  //   if (!req.files) {
  //     console.log("без файла");

  //     // JUST POST WITHOUT AVATAR
  //     res.send({
  //       status: false,
  //       message: 'No file uploaded'
  //     });

  //     // console.log(res.body);
  //   const post = new Post({
  //     title: req.body.title,
  //     description: req.body.description,
  //     date: req.body.date
  //   })

  //   const savedPost = await post.save()
  //   res.send(savedPost)


  //   } else {
  //     console.log("с файлом");

  //     console.log(req.files);

  //     //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
  //     let avatar = req.files.avatar;

  //     //Use the mv() method to place the file in upload directory (i.e. "uploads")
  //     avatar.mv('./uploads/' + avatar.name);

  //     // send response
  //     res.send({
  //       status: true,
  //       message: 'File is uploaded',
  //       data: {
  //         name: avatar.name,
  //         mimetype: avatar.mimetype,
  //         size: avatar.size
  //       }
  //     });
  //   }




  // } catch (error) {
  //   console.log(error);

  // }

})

module.exports = router
