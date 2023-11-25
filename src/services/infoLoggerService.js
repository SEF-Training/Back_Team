const { format, createLogger, transports } = require("winston");
const { combine, timestamp, printf, prettyPrint, colorize } = format;
const file = { level: 'info', filename: 'src/logs/info.log', handleExceptions: false, json: true, maxsize: 5242880, colorize: false }
const customFormat = printf((info) => { return `[${info.timestamp}] ${info.level}: ${info.message}` });
const infoLogger = createLogger({
  level: "info",
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),prettyPrint(), customFormat ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.simple(),
    }),
  new transports.File(file),
  ],
});
module.exports={infoLogger}