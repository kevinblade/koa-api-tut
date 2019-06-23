// declare Author schema
module.exports = `
  type Author {
    _id: String
    name: String
    posts: [Post]
  }
`