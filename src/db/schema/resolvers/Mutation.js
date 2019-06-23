require('../../../lib/env').config()
// const util = require('util')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const logger = require('../../../lib/logger')('resolvers/Mutation.js')

module.exports = {
  // (parent, args, context) => {...}
  addPost: async (_, args, { models: { Author, Post }, currentUser }) => {
    if (currentUser) {
      const _id = mongoose.Types.ObjectId(args.author_id)
      const author = Author.findOne({ _id })
      if (author) {
        return await new Post({
          title: args.title,
          text: args.text,
          author_id: _id
        }).save()
      } else {
        return null
      }
    }
    return null
  },
  addAuthor: async (_, args, { models: { Author }, currentUser }) =>
    currentUser ? await new Author({ name: args.name }).save() : null,
  signUp: async (_, args, { models: { User } }) =>
    await new User({
      email: args.email,
      passwordHash: await bcrypt.hash(args.password, 12)
    }).save(),
  signIn: async (_, args, { models: { User } }) => {
    const user = await User.findOne({ email: args.email })
    if (!user) {
      throw new Error('There is not a user with that email.')
    }
    const valid = await bcrypt.compare(args.password, user.passwordHash)
    if (!valid) {
      throw new Error('Incorrect password.')
    }
    const token = jwt.sign(
      {
        user: { _id: user._id, email: user.email }
      },
      process.env.API_SECRET,
      { expiresIn: '1y' }
    )
    return token
  }
}
