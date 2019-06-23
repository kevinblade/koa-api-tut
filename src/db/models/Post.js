const mongoose = require('mongoose')

module.exports = mongoose.model('post', {
  title: String,
  text: String,
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author'
  }
})
