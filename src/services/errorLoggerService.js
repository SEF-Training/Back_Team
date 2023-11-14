const winston = require("winston");
const { combine, timestamp,printf, errors, cli } = winston.format;
const errorLogger = winston.createLogger({
  level: "error",
  format: combine(
    errors({ stack: true }),
    timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
    printf((info) => `[${info.timestamp}] ${info.stack}`)
  ),
  transports: [
    new winston.transports.Console({
      format: cli()
    }),
    new winston.transports.File({
      filename: 'src/logs/error.log',
    }),
  ],
});
module.exports = { errorLogger }