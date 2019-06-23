require('./env').config()
const winston = require('winston')

module.exports = label => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.label({
        label
      }),
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
    transports: [
      new winston.transports.Console({
        level: process.env.LOG_LEVEL
      }),
      new winston.transports.File({
        filename: 'koa-api-tut.log',
        level: process.env.LOG_LEVEL
      })
    ]
  })
}
