const { createLogger, format, transports } = require('winston')

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  transport: [
    new transports.File({
      filename: 'combined.log',
      maxFiles: 5,
      maxsize: 5242880,
      format: format.combine(
        format.label(({ label: 'COMBINE' })),
        format.timestamp(),
        myFormat
      )
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      maxFiles: 5,
      maxsize: 5242880,
      format: format.combine(
        format.label(({ label: 'ERROR' })),
        format.timestamp(),
        myFormat
      )
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.combine(
    format.label(({ label: 'CONSOLE' })),
    format.timestamp(),
    myFormat
  ) }))
}

module.exports = logger