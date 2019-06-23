/* eslint-disable no-unused-vars */
require('../lib/env').config()
const util = require('util')
const KoaRouter = require('koa-router')
const logger = require('../lib/logger')('socket.js')
const eventEmitter = require('./emitter')

const createSocketRouter = () => {
  const router = new KoaRouter()

  router.get(`/api/${process.env.API_VER}/socket/:_id`, async (ctx, next) => {
    logger.debug(`ctx.params._id = ${ctx.params._id}`)

    /**
     * definition event listeners
     */

    // exec:agentId event listener
    const _onExecEventListener = data => {
      logger.debug(`Exec event: data = ${util.inspect(data)}`)
      ctx.websocket.send(
        JSON.stringify({
          event: `exec:${data.agentId}`,
          payload: data,
        })
      )
    }

    // register handler for 'message' event
    ctx.websocket.on('message', data => {
      const message = JSON.parse(data)
      logger.debug(`message = ${util.inspect(message)}`)

      switch (message.event) {
        case 'join':
          // // Process 'join' event
          // // send event to agentRoutes module
          // eventEmitter.emit('add-agent', {
          //   _id: ctx.params._id,
          //   agentInfo: message.agentInfo,
          // })

          /**
           * register event listener to eventEmitter
           */

          // // exec:agentId event
          // eventEmitter.removeListener(
          //   `exec:${ctx.params._id}`,
          //   _onExecEventListener
          // )
          // eventEmitter.on(`exec:${ctx.params._id}`, _onExecEventListener)

          // // exec-script:agentId event
          // eventEmitter.removeListener(
          //   `exec-script:${ctx.params._id}`,
          //   _onExecScriptEventListener
          // )
          // eventEmitter.on(
          //   `exec-script:${ctx.params._id}`,
          //   _onExecScriptEventListener
          // )

          // // transfer:agentId event
          // eventEmitter.removeListener(
          //   `transfer:${ctx.params._id}`,
          //   _onTransferEventListener
          // )
          // eventEmitter.on(
          //   `transfer:${ctx.params._id}`,
          //   _onTransferEventListener
          // )
          break
        case 'agent-info':
          // // Process 'agent-info' event
          // // Fire 'agent-info' local event to agent.js
          // eventEmitter.emit('agent-info', {
          //   _id: ctx.params._id,
          //   agentInfo: message.agentInfo,
          //   refresh: message.refresh, // update the agent information
          // })
          break
      }
    })

    ctx.websocket.on('ping', e => {
      logger.debug('Received: ping from the client', new Date().toString())
      ctx.websocket.send(
        JSON.stringify({
          event: 'pong',
        })
      )
    })

    // register handler for 'close' event
    ctx.websocket.on('close', e => {
      logger.debug(`Agent:${ctx.params._id}: disconnected by ${e}`)
      // // send event to agentRoutes module
      // eventEmitter.emit('del-agent', {
      //   _id: ctx.params._id,
      // })

      // /**
      //  * unregister event listener from eventEmitter
      //  */

      // // exec:agentId event
      // eventEmitter.removeListener(
      //   `exec:${ctx.params._id}`,
      //   _onExecEventListener
      // )

      // // exec-script:agentId event
      // eventEmitter.removeListener(
      //   `exec-script:${ctx.params._id}`,
      //   _onExecScriptEventListener
      // )

      // // transfer:agentId event
      // eventEmitter.removeListener(
      //   `transfer:${ctx.params._id}`,
      //   _onTransferEventListener
      // )
    })
  })

  return router
}

module.exports = createSocketRouter()
