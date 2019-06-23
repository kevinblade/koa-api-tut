const events = require('events')

// This emitter has to be unique globally.
let eventEmitter = null

const createEventEmitter = () => {
  if (eventEmitter === null) {
    eventEmitter = new events.EventEmitter()
  }

  return eventEmitter
}

module.exports = createEventEmitter()
