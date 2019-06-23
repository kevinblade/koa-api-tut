// declare Mutation schema
module.exports = `
  type Mutation {
    addPost(title: String, text: String, author_id: String): Post!
    addAuthor(name: String): Author!
    signUp(email: String!, password: String!): User!
    signIn(email: String!, password: String!): String!
  }
`
