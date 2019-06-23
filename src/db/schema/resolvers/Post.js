module.exports = {
  // (parent, args, context) => {...}
  author: async ({ author_id }, _, { models: { Author } }) =>
    await Author.findOne({ _id: author_id })
}
