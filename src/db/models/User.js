const mongoose = require('mongoose')

module.exports = mongoose.model('user', {
  email: String,
  passwordHash: String
})
