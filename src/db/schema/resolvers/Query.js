// const util = require('util')
// const logger = require('../../../lib/logger')('resolvers/Query')

module.exports = {
  // (parent, args, context) => {...}
  posts: async (_, args, { models: { Post }, currentUser }) => (currentUser ? await Post.find() : null),
  author: async (_, args, { models: { Author }, currentUser}) => (currentUser ? await Author.findOne({ name: args.name }) : null),
  findPosts: async (_, args, { models: { Post }, currentUser }) => (currentUser ? await Post.find({ title: new RegExp(args.title, 'ig') }) : null)
}
