/* eslint-disable no-unused-vars */
require('./lib/env').config()
const util = require('util')
const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const websockify = require('koa-websocket')
const mongoose = require('mongoose')
const middleware = require('./middleware')
const { socketRouter } = require('./routers')
const db = require('./db')
const logger = require('./lib/logger')('app.js')

const hostname = 'localhost'
const port = process.env.PORT || 4000

// connect to mongodb

mongoose
  .connect('mongodb://root:password@localhost:27017/tutorials')
  .then(() => {
    logger.info(`🚀 MongoDB ready at http://${hostname}:27017/tutorials`)
  })
  .catch(err => {
    logger.error(`ERROR: MongoDB connection failed with ${err}`)
  })

// enable websocket

const app = websockify(new Koa())

// middleware

app.use(middleware())

// custom routers

app.ws.use(async (ctx, next) => await next(ctx))
app.ws.use(socketRouter.routes()).use(socketRouter.allowedMethods())

// ApolloServer

const server = new ApolloServer({
  typeDefs: db.schema.typeDefs,
  resolvers: db.schema.resolvers,
  context: ({ ctx }) => {
    return { models: db.models, currentUser: ctx.req.user }
  },
  introspection: true,
  playground: true,
  cors: {
    origin: '*', // <- allow request from all domains
    credentials: true
  },
  uploads: {
    maxFileSize: 10000000000, // 10 MB
    maxFiles: 4
  }
})

// apply middlewares

server.applyMiddleware({ app, bodyParserConfig: true })

// error handler

app.use(ctx => {
  ctx.status = (ctx.error && ctx.error.status) || ctx.response.status || 500
  ctx.body = ctx.error || ctx.response.message
})

// start the app server

app.listen({ port: 4000 }, async () =>
  logger.info(
    `🚀 Server ready at http://${hostname}:${port}${server.graphqlPath}`
  )
)
