require('../lib/env').config()
// const util = require('util')
const compose = require('koa-compose')
const convert = require('koa-convert')
const jwt = require('jsonwebtoken')
const koaLogger = require('koa-logger')
const koaBodyParser = require('koa-bodyparser-graphql')
const json = require('koa-json')
const serve = require('koa-static')
const logger = require('../lib/logger')('middleware')

const responseTime = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

const addUser = async (ctx, next) => {
  const token = ctx.req.headers.authorization
  try {
    const { user } = await jwt.verify(token, process.env.API_SECRET)
    ctx.req.user = user
  } catch (error) {
    logger.error(`Reason: ${error.message}`) 
  }
  await next()
}

module.exports = () => {
  return compose([
    convert(addUser),
    convert(responseTime),
    convert(koaLogger()),
    convert(json()),
    convert(koaBodyParser()),
    convert(serve('../public'))
  ])
}
