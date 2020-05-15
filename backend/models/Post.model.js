const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  postAvatarPath: {type: Buffer},
  data: {type: Date,default: Date.now}
});


module.exports = mongoose.model('post', postSchema)
