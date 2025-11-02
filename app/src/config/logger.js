// ESM import statements
import winston from 'winston'; // require -> import (default import)
// (수정) winston v3+에서는 format 객체가 winston 모듈 아래에 있습니다.
const { createLogger, transports, format } = winston;
const { combine, timestamp, printf, json, simple, colorize, label } = format; // format은 winston.format

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
    dirname: './logs', // (참고) ESM에서는 __dirname이 없으므로 상대 경로 확인 필요
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

// (수정 없음) process.env는 ESM에서도 동일하게 사용 가능
if (process.env.NODE_ENV !== 'production') {
  logger.add(opts.console);
}

// (수정) module.exports -> export default
export default logger;
