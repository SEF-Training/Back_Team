const morgan = require('morgan')
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');
const { combine, timestamp, json ,prettyPrint} = winston.format;
const logger = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A', }),
    prettyPrint(),
    json()
  ),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({
      filename: 'src/logs/http.log',
    }),
  ],
});

morgan.token("id", () => uuidv4())
const httpLogger = morgan(':id :method :url :status :res[content-length] :response-time ms', {
  stream: { write: (message) => logger.http(message.trim()) }
}
);
module.exports = { httpLogger }