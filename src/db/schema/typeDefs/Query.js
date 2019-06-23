// declare Query schema
module.exports = `
  type Query {
    posts: [Post],
    author(name: String): Author,
    findPosts(title: String): [Post]
  }
`