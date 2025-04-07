const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, json, simple, colorize, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: '산불 감지 admin',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:dd',
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: 'access.log',
    dirname: './logs',
    level: 'info',
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: 'info',
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(opts.console);
}

module.exports = logger;
