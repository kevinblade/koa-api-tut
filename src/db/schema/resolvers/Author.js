module.exports = {
  // (parent, args, context) => {...}
  posts: async ({ _id }, _, { models: { Post } }) => await Post.find({ author_id: _id })
}
